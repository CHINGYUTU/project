const db = require('../db');
const Point = require('./pointController');

// 📌 查詢個人訂單
exports.getMyOrders = async (req, res) => {
  const userId = req.user.id;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法查詢個人訂單' });
  }

  try {
    const [rows] = await db.query(
      `SELECT o.*, 
          GROUP_CONCAT(LEFT(oi.item_name, 50) SEPARATOR ', ') AS item_names,
          GROUP_CONCAT(DISTINCT LEFT(oi.location, 100) SEPARATOR ', ') AS locations,
          GROUP_CONCAT(oi.price SEPARATOR ', ') AS item_prices
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       WHERE o.buyer_id = ? OR o.seller_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId, userId]
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 管理員查詢所有訂單
exports.getAllOrders = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以查看所有訂單' });
  }

  try {
    const [rows] = await db.query(
      `SELECT o.*, 
          u.email AS buyer_email,
          s.email AS seller_email,
          GROUP_CONCAT(LEFT(oi.item_name, 50) SEPARATOR ', ') AS item_names,
          GROUP_CONCAT(DISTINCT LEFT(oi.location, 100) SEPARATOR ', ') AS locations,
          GROUP_CONCAT(oi.price SEPARATOR ', ') AS item_prices
       FROM orders o
       JOIN users u ON o.buyer_id = u.id
       JOIN users s ON o.seller_id = s.id
       JOIN order_items oi ON o.id = oi.order_id
       GROUP BY o.id
       ORDER BY o.created_at DESC`
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢所有訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 審核訂單（拒絕時更新為 rejected）
exports.reviewOrder = async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const { approve } = req.body;

  try {
    if (approve) {
      await db.query('UPDATE orders SET status = ? WHERE id = ?', ['confirmed', orderId]);
      res.json({ message: '訂單已確認' });
    } else {
      await db.query('UPDATE orders SET status = ? WHERE id = ?', ['rejected', orderId]);
      const [orderItems] = await db.query('SELECT item_id FROM order_items WHERE order_id = ?', [orderId]);
      for (const oi of orderItems) {
        await db.query('UPDATE items SET status = ? WHERE id = ?', ['available', oi.item_id]);
      }
      res.json({ message: '訂單已拒絕並釋放商品' });
    }
  } catch (err) {
    console.error('❌ reviewOrder 錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 查詢「待確認訂單」+ 買家與商品詳細資訊 (修改為查詢 pending 狀態訂單)
exports.getPendingOrdersWithDetails = async (req, res) => {
  const sellerId = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT 
        o.id AS order_id,
        o.status,
        o.created_at,
        o.price,
        o.trade_time,

        -- 買家資訊
        buyer.id AS buyer_id,
        buyer.name AS buyer_name,
        buyer.avatar_url AS buyer_avatar,

        -- 商品資訊
        i.id AS item_id,
        i.name AS item_name,
        i.image_url AS item_image,
        i.location AS order_location

      FROM orders o
      JOIN users buyer ON o.buyer_id = buyer.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN items i ON oi.item_id = i.id
      WHERE o.seller_id = ? AND o.status = 'pending'  -- 修改為查詢 pending 狀態
      ORDER BY o.created_at DESC
    `, [sellerId]);

    res.json(rows);
  } catch (err) {
    console.error("❌ 獲取待確認訂單錯誤:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
};

// 📌 建立訂單
exports.createOrder = async (req, res) => {
  const { itemId, tradeTime } = req.body; // 接收買家選擇的預計面交時間
  const buyerId = req.user.id;

  try {
    // 取得商品資訊
    const [itemRows] = await db.query('SELECT * FROM items WHERE id = ?', [itemId]);
    if (itemRows.length === 0) {
      return res.status(404).json({ message: '找不到此商品' });
    }
    const item = itemRows[0];

    // 檢查商品是否可購買
    if (item.status !== 'available') {
      return res.status(400).json({ message: '此商品目前無法購買' });
    }

    // 1️⃣ 建立訂單
    const [orderResult] = await db.query(
      `INSERT INTO orders (buyer_id, seller_id, status, created_at, trade_time, price)
       VALUES (?, ?, 'pending', NOW(), ?, ?)`,
      [buyerId, item.user_id, tradeTime, item.price]
    );

    const orderId = orderResult.insertId;

    // 2️⃣ 插入 order_items
    await db.query(
      'INSERT INTO order_items (order_id, item_id, item_name, location, price) VALUES (?, ?, ?, ?, ?)',
      [orderId, item.id, item.name, item.location, item.price]
    );

    // 3️⃣ 更新商品狀態為 reserved
    await db.query('UPDATE items SET status = ? WHERE id = ?', ['reserved', itemId]);

    // 4️⃣ 回傳 orderId
    res.json({ message: '訂單建立成功', data: { orderId } });

  } catch (err) {
    console.error('❌ 建立訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 刪除訂單
exports.deleteOrder = async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      'SELECT * FROM orders WHERE id = ? AND (buyer_id = ? OR seller_id = ?)',
      [orderId, userId, userId]
    );
    if (!rows.length) return res.status(404).json({ message: '訂單不存在或無權限刪除' });

    await db.query('UPDATE orders SET status = ? WHERE id = ?', ['rejected', orderId]);

    const [orderItems] = await db.query('SELECT item_id FROM order_items WHERE order_id = ?', [orderId]);
    for (const oi of orderItems) {
      await db.query('UPDATE items SET status = ? WHERE id = ?', ['available', oi.item_id]);
    }

    res.json({ message: '訂單已標記為拒絕並釋放商品' });
  } catch (err) {
    console.error('❌ deleteOrder 錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 後端API - 獲取賣家待交易訂單(包含賣家訊息和商品圖片）
exports.getSellerConfirmedOrders = async (req, res) => {
  const sellerId = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT 
        o.id,
        o.status,
        o.created_at,
        o.trade_time,
        o.price,
        
        -- 买家信息
        buyer.id AS buyer_id,
        buyer.name AS buyer_name,
        buyer.avatar_url AS buyer_avatar,
        
        -- 商品信息
        i.id AS item_id,
        i.name AS item_name,
        i.image_url AS item_image,
        i.location AS item_location
        
      FROM orders o
      JOIN users buyer ON o.buyer_id = buyer.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN items i ON oi.item_id = i.id
      WHERE o.seller_id = ? AND o.status = 'confirmed'
      ORDER BY o.created_at DESC
    `, [sellerId]);

    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢待交易訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 更新訂單狀態（僅限 pending → confirmed / cancelled）
exports.updateOrderStatus = async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const { status } = req.body;

  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: '無效的訂單狀態更新' });
  }

  try {
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    res.json({ message: `訂單狀態已更新為 ${status}` });
  } catch (err) {
    console.error('❌ updateOrderStatus 錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 完成訂單
exports.completeOrder = async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    return res.status(400).json({ message: '訂單 ID 無效' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [orderRows] = await conn.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (!orderRows.length) {
      conn.release();
      return res.status(404).json({ message: '訂單不存在' });
    }
    const order = orderRows[0];

    // 更新訂單狀態為 completed
    await conn.query(
      'UPDATE orders SET status = ?, completed_time = NOW() WHERE id = ?',
      ['completed', orderId]
    );

    // 將訂單中的商品狀態更新為 sold
    const [orderItems] = await conn.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
    for (let item of orderItems) {
      await conn.query('UPDATE items SET status = ? WHERE id = ?', ['sold', item.item_id]);
    }

    // 計算積分
    if (!(await Point.isOrderPointsCalculated(orderId, conn))) {
      const price = Number(order.price);
      if (isNaN(price)) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({ message: '訂單價格錯誤，無法計算積分' });
      }

      const buyerPoints = Math.floor(price / 1.36);     // 買家積分
      const sellerPoints = Math.floor(price * 1.4706);  // 賣家積分

      // 增加買家積分
      await Point.createPointRecord({
        user_id: order.buyer_id,
        order_id: orderId,
        point_ac: buyerPoints,
        add_cut: 'add'
      }, conn);

      // 增加賣家積分
      await Point.createPointRecord({
        user_id: order.seller_id,
        order_id: orderId,
        point_ac: sellerPoints,
        add_cut: 'add'
      }, conn);
    }

    await conn.commit();
    conn.release();

    res.json({ message: '訂單已完成，買家與賣家積分已正確發放' });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error('❌ completeOrder 錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 取消訂單
exports.cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  const conn = await db.getConnection(); // ⚡ 取一個連線
  try {
    const [orders] = await conn.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (orders.length === 0) {
      conn.release();
      return res.status(404).json({ message: '找不到該訂單' });
    }

    const order = orders[0];

    // ✅ 權限檢查
    if (userId !== order.seller_id) {
      conn.release();
      return res.status(403).json({ message: '只有賣家可以取消訂單' });
    }

    const now = new Date();
    const tradeDate = new Date(order.trade_time);
    const threeDaysBefore = new Date(tradeDate.getTime() - 3 * 24 * 60 * 60 * 1000);

    if (now > threeDaysBefore) {
      conn.release();
      return res.status(400).json({ message: '面交時間已不足三天，無法取消訂單' });
    }

    // ⚡ 使用 transaction
    await conn.beginTransaction();

    await conn.query('UPDATE orders SET status = ? WHERE id = ?', ['cancelled', orderId]);

    await conn.query(
    `UPDATE items SET status = 'available' 
    WHERE id IN (SELECT item_id FROM order_items WHERE order_id = ?)`,
    [orderId]
  );

    await conn.commit();
    conn.release();

    res.json({ message: '訂單已取消' });
  } catch (err) {
    await conn.rollback(); // ❌ 記得這裡要用 conn，不是 db
    conn.release();
    console.error('❌ 取消訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 查詢「完成交易訂單」(賣家專用)
exports.getSellerCompletedOrders = async (req, res) => {
  const sellerId = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT 
        o.id AS id,
        o.status,
        o.created_at,
        o.trade_time,
        o.completed_time,
        o.price,

        -- 買家資訊
        buyer.id AS buyer_id,
        buyer.name AS buyer_name,
        buyer.avatar_url AS buyer_avatar,

        -- 商品資訊
        i.id AS item_id,
        i.name AS item_name,
        i.image_url AS item_image,
        i.location AS item_location

      FROM orders o
      JOIN users buyer ON o.buyer_id = buyer.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN items i ON oi.item_id = i.id
      WHERE o.seller_id = ? AND o.status = 'completed'
      ORDER BY o.completed_time DESC
    `, [sellerId]);

    res.json({ message: "查詢成功", data: rows });
  } catch (err) {
    console.error("❌ 獲取完成交易訂單錯誤:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
};



// 📌 查詢單筆訂單詳情
exports.getOrderDetail = async (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.user.id;
  const role = req.user.role;

  try {
    // 查詢訂單主資訊
    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);

    if (orders.length === 0) {
      return res.status(404).json({ message: '找不到該訂單' });
    }

    const order = orders[0];

    // 僅限該訂單的買家、賣家或管理員查看
    if (role !== 'admin' && userId !== order.buyer_id && userId !== order.seller_id) {
      return res.status(403).json({ message: '無權限查看此訂單' });
    }

    // 查詢訂單包含的商品
    const [items] = await db.query(
      `SELECT item_name, price, location
      FROM order_items
      WHERE order_id = ?`,
      [orderId]
    );

    res.json({
      message: '查詢成功',
      data: {
        order,
        items
      }
    });
  } catch (err) {
    console.error('❌ 查詢訂單詳情錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

//  ---------------買家部分功能---------------
// 📌 買家 - 待確認訂單
exports.getBuyerPendingOrders = async (req, res) => {
  const buyerId = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT 
        o.id AS order_id,
        o.status,
        o.created_at,
        o.trade_time,
        o.price,

        -- 買家資訊
        buyer.id AS buyer_id,
        buyer.name AS buyer_name,
        buyer.avatar_url AS buyer_avatar,

        -- 賣家資訊（買家最需要看到這個）
        seller.id AS seller_id,
        seller.name AS seller_name,
        seller.avatar_url AS seller_avatar,

        -- 商品資訊（地點抓 order_items）
        i.id AS item_id,
        i.name AS item_name,
        i.image_url AS item_image,
        oi.location AS order_location,
        oi.price AS item_price

      FROM orders o
      JOIN users buyer ON o.buyer_id = buyer.id
      JOIN users seller ON o.seller_id = seller.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN items i ON oi.item_id = i.id
      WHERE o.buyer_id = ? AND o.status = 'pending'
      ORDER BY o.created_at DESC
    `, [buyerId]);

    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error("❌ 獲取買家待確認訂單錯誤:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
};

// 📌 買家 - 已確認訂單
exports.getBuyerConfirmedOrders = async (req, res) => {
  const buyerId = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT 
        o.id AS order_id,
        o.status,
        o.created_at,
        o.trade_time,
        o.price,

        buyer.id AS buyer_id,
        buyer.name AS buyer_name,
        buyer.avatar_url AS buyer_avatar,

        seller.id AS seller_id,
        seller.name AS seller_name,
        seller.avatar_url AS seller_avatar,

        i.id AS item_id,
        i.name AS item_name,
        i.image_url AS item_image,
        oi.location AS order_location,
        oi.price AS item_price

      FROM orders o
      JOIN users buyer ON o.buyer_id = buyer.id
      JOIN users seller ON o.seller_id = seller.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN items i ON oi.item_id = i.id
      WHERE o.buyer_id = ? AND o.status = 'confirmed'
      ORDER BY o.created_at DESC
    `, [buyerId]);

    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error("❌ 查詢買家已確認訂單錯誤:", err);
    res.status(500).json({ error: '伺服器錯誤' });
  }
};

// 📌 買家 - 已完成訂單
exports.getBuyerCompletedOrders = async (req, res) => {
  const buyerId = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT 
        o.id AS order_id,
        o.status,
        o.created_at,
        o.trade_time,
        o.completed_time,
        o.price,

        buyer.id AS buyer_id,
        buyer.name AS buyer_name,
        buyer.avatar_url AS buyer_avatar,

        seller.id AS seller_id,
        seller.name AS seller_name,
        seller.avatar_url AS seller_avatar,

        i.id AS item_id,
        i.name AS item_name,
        i.image_url AS item_image,
        oi.location AS order_location,
        oi.price AS item_price

      FROM orders o
      JOIN users buyer ON o.buyer_id = buyer.id
      JOIN users seller ON o.seller_id = seller.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN items i ON oi.item_id = i.id
      WHERE o.buyer_id = ? AND o.status = 'completed'
      ORDER BY o.completed_time DESC
    `, [buyerId]);

    res.json({ message: "查詢成功", data: rows });
  } catch (err) {
    console.error("❌ 獲取買家完成交易訂單錯誤:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
};

// 📌 買家 - 已取消訂單
exports.getBuyerCancelledOrders = async (req, res) => {
  const buyerId = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT 
        o.id AS order_id,
        o.status,
        o.created_at,
        o.trade_time,
        o.price,

        buyer.id AS buyer_id,
        buyer.name AS buyer_name,
        buyer.avatar_url AS buyer_avatar,

        seller.id AS seller_id,
        seller.name AS seller_name,
        seller.avatar_url AS seller_avatar,

        i.id AS item_id,
        i.name AS item_name,
        i.image_url AS item_image,
        oi.location AS order_location,
        oi.price AS item_price

      FROM orders o
      JOIN users buyer ON o.buyer_id = buyer.id
      JOIN users seller ON o.seller_id = seller.id
      JOIN order_items oi ON o.id = oi.order_id
      JOIN items i ON oi.item_id = i.id
      WHERE o.buyer_id = ? AND o.status = 'cancelled'
      ORDER BY o.created_at DESC
    `, [buyerId]);

    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error("❌ 查詢買家已取消訂單錯誤:", err);
    res.status(500).json({ error: '伺服器錯誤' });
  }
};