const db = require('../db');

// 📌 購買商品（建立訂單）
exports.purchaseItem = async (req, res) => {
  const buyerId = req.user.id;
  const { item_id } = req.body;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法購買商品' });
  }

  const conn = await db.getConnection(); // 🔹 取得資料庫連線
  await conn.beginTransaction();         // 🔹 開啟交易

  try {
    // 🔒 鎖定該商品
    const [items] = await conn.query('SELECT * FROM items WHERE id = ? FOR UPDATE', [item_id]);
    if (items.length === 0 || items[0].status !== 'available') {
      await conn.rollback();
      return res.status(400).json({ message: '商品不存在或已被下單' });
    }

    const item = items[0];

    // 建立訂單
    await conn.query(
      `INSERT INTO orders (item_id, buyer_id, seller_id, status, created_at)
       VALUES (?, ?, ?, 'pending', NOW())`,
      [item_id, buyerId, item.user_id]
    );

    // 更新商品狀態
    await conn.query('UPDATE items SET status = "reserved" WHERE id = ?', [item_id]);

    await conn.commit(); // ✅ 提交交易
    res.json({ message: '訂單已建立，等待賣家確認' });
  } catch (err) {
    await conn.rollback(); // ❌ 發生錯誤就回滾
    console.error('❌ 建立訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  } finally {
    conn.release(); // 🔚 釋放連線
  }
};


// 📌 查詢個人訂單（買家或賣家都能查）
exports.getMyOrders = async (req, res) => {
  const userId = req.user.id;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法查詢個人訂單' });
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM orders WHERE buyer_id = ? OR seller_id = ? ORDER BY created_at DESC`,
      [userId, userId]
    );
    res.json(rows);
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
      `SELECT o.*, i.name AS item_name, u.email AS buyer_email
       FROM orders o
       JOIN items i ON o.item_id = i.id
       JOIN users u ON o.buyer_id = u.id
       ORDER BY o.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ 查詢所有訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// ✅ 📌 更新訂單狀態
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;
  const userId = req.user.id;
  const role = req.user.role;

  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({ message: '不合法的訂單狀態' });
  }

  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (orders.length === 0) {
      return res.status(404).json({ message: '找不到該訂單' });
    }

    const order = orders[0];

    // 只能由訂單買家或賣家更新
    if (order.buyer_id !== userId && order.seller_id !== userId) {
      return res.status(403).json({ message: '無權限更新此訂單' });
    }

    // 規則範例（可擴充更多邏輯）：
    if (newStatus === 'confirmed' && userId !== order.seller_id) {
      return res.status(403).json({ message: '只有賣家可以確認訂單' });
    }

    if (newStatus === 'completed' && userId !== order.buyer_id) {
      return res.status(403).json({ message: '只有買家可以完成訂單' });
    }

    // 更新訂單狀態
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [newStatus, orderId]);

    // ✅ 如果訂單完成或取消，更新商品狀態
    if (newStatus === 'completed') {
      await db.query('UPDATE items SET status = "sold" WHERE id = ?', [order.item_id]);
    } else if (newStatus === 'cancelled') {
      await db.query('UPDATE items SET status = "available" WHERE id = ?', [order.item_id]);
    }

    res.json({ message: `訂單狀態已更新為 ${newStatus}` });
  } catch (err) {
    console.error('❌ 更新訂單狀態錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};
