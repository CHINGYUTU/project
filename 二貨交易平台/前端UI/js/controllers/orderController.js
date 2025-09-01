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
      // ✅ 同意 → 訂單完成
      await db.query('UPDATE orders SET status = ? WHERE id = ?', ['completed', orderId]);
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

// 📌 建立訂單
exports.createOrder = async (req, res) => {
  const { itemId } = req.body;
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

    // 1️⃣ 建立訂單（保持 orders.status 為 confirmed）
    const [orderResult] = await db.query(
      `INSERT INTO orders (buyer_id, seller_id, status, created_at, total_price)
       VALUES (?, ?, 'confirmed', NOW(), ?)`,
      [buyerId, item.user_id, item.price]
    );

    const orderId = orderResult.insertId;

    // 2️⃣ 插入 order_items
    await db.query(
      'INSERT INTO order_items (order_id, item_id, item_name, location, price) VALUES (?, ?, ?, ?, ?)',
      [orderId, item.id, item.name, item.location, item.price]
    );

    // 3️⃣ 更新商品狀態為 reserved（不是 confirmed）
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
  const { newStatus } = req.body;
  const userId = req.user.id;

  const validStatuses = ['confirmed', 'completed', 'cancelled'];
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

    // 權限檢查邏輯保持不變
    if (newStatus === 'confirmed' && userId !== order.seller_id) {
      return res.status(403).json({ message: '只有賣家可以確認訂單' });
    }

    if (newStatus === 'completed' && userId !== order.buyer_id) {
      return res.status(403).json({ message: '只有買家可以完成訂單' });
    }

    // 更新訂單狀態
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [newStatus, orderId]);

    // 根據訂單狀態更新商品狀態
    if (newStatus === 'completed') {
      // 訂單完成 → 商品售出
      await db.query(
        `UPDATE items 
         SET status = 'sold' 
         WHERE id IN (SELECT item_id FROM order_items WHERE order_id = ?)`,
        [orderId]
      );
    } else if (newStatus === 'cancelled') {
      // 訂單取消 → 商品恢復可購買
      await db.query(
        `UPDATE items 
         SET status = 'available' 
         WHERE id IN (SELECT item_id FROM order_items WHERE order_id = ?)`,
        [orderId]
      );
    }
    // confirmed 狀態保持商品為 reserved

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
