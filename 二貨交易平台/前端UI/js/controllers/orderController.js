const db = require('../db');

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

// 📌 審核訂單（同意 / 拒絕）
exports.reviewOrder = async (req, res) => {
  const { orderId } = req.params;
  const { decision } = req.body; // 'agree' 或 'reject'

  try {
    // 找訂單 & 對應的商品
    const [orders] = await db.query(
      `SELECT o.*, oi.item_id 
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       WHERE o.id = ?`, 
      [orderId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: '找不到該訂單' });
    }

    const order = orders[0];

    if (decision === 'agree') {
      // ✅ 同意 → 訂單狀態改為 confirmed (已確認)
      await db.query('UPDATE orders SET status = ? WHERE id = ?', ['confirmed', orderId]);
      return res.json({ message: '訂單審核通過' });
    } else if (decision === 'reject') {
      // ❌ 拒絕 → 商品恢復 available，刪除訂單
      await db.query('UPDATE items SET status = ? WHERE id = ?', ['available', order.item_id]);
      await db.query('DELETE FROM orders WHERE id = ?', [orderId]);
      return res.json({ message: '拒絕審核，已重新上架' });
    } else {
      return res.status(400).json({ message: 'decision 必須是 agree 或 reject' });
    }
  } catch (error) {
    console.error('❌ 審核訂單錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
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
        o.total_price,
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
      `INSERT INTO orders (buyer_id, seller_id, status, created_at, trade_time, total_price)
       VALUES (?, ?, 'pending', NOW(), ?, ?)`, // 添加 total_price
      [buyerId, item.user_id, tradeTime, item.price] // 添加商品價格
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
  const { orderId } = req.params;
  const userId = req.user.id;

  try {
    // 確認訂單是屬於這個使用者
    const [rows] = await db.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [orderId, userId]);
    if (rows.length === 0) {
      return res.status(403).json({ message: '無權刪除此訂單或訂單不存在' });
    }

    await db.query('DELETE FROM orders WHERE id = ?', [orderId]);
    res.json({ message: '訂單已刪除' });
  } catch (error) {
    console.error('❌ 刪除訂單失敗:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 更新訂單狀態
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { newStatus, tradeTime } = req.body; // 添加tradeTime參數
  const userId = req.user.id;

  const validStatuses = ['pending' , 'confirmed', 'completed', 'cancelled'];
  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({ message: '不合法的訂單狀態' });
  }

  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (orders.length === 0) {
      return res.status(404).json({ message: '找不到該訂單' });
    }

    const order = orders[0];
    if (order.buyer_id !== userId && order.seller_id !== userId) {
      return res.status(403).json({ message: '無權限更新此訂單' });
    }

    // 權限檢查
    if (newStatus === 'confirmed' && userId !== order.seller_id) {
      return res.status(403).json({ message: '只有賣家可以確認訂單' });
    }
    if (newStatus === 'completed' && userId !== order.buyer_id) {
      return res.status(403).json({ message: '只有買家可以完成訂單' });
    }

    // 更新狀態 & 可選更新 trade_time
    if (tradeTime) {
      await db.query(
        `UPDATE orders SET status = ?, trade_time = ? WHERE id = ?`,
        [newStatus, tradeTime, orderId]
      );
    } else {
      await db.query(
        `UPDATE orders SET status = ? WHERE id = ?`,
        [newStatus, orderId]
      );
    }

    // 根據狀態更新商品
    if (newStatus === 'completed') {
      await db.query(
        `UPDATE items SET status = 'sold' 
         WHERE id IN (SELECT item_id FROM order_items WHERE order_id = ?)`,
        [orderId]
      );
    } else if (newStatus === 'cancelled') {
      await db.query(
        `UPDATE items SET status = 'available' 
         WHERE id IN (SELECT item_id FROM order_items WHERE order_id = ?)`,
        [orderId]
      );
    }
    // confirmed 狀態 → 保持 reserved

    res.json({ message: `訂單狀態已更新為 ${newStatus}` });
  } catch (err) {
    console.error('❌ 更新訂單狀態錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
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