const db = require('../db');

// 📌 建立訂單
exports.createOrder = async (req, res) => {
  const { item_id } = req.body;
  const buyer_id = req.user.id; // 從 JWT 中取得登入的使用者 ID

  try {
    // 檢查商品是否存在且為 available
    const [items] = await db.query('SELECT * FROM items WHERE id = ? AND status = ?', [item_id, 'available']);
    if (items.length === 0) {
      return res.status(400).json({ message: '商品不存在或已售出' });
    }

    const item = items[0];

    // 建立訂單
    await db.query(
      `INSERT INTO orders (item_id, buyer_id, seller_id, status) VALUES (?, ?, ?, 'completed')`,
      [item_id, buyer_id, item.seller_id]
    );

    // 將商品狀態改為 sold
    await db.query('UPDATE items SET status = ? WHERE id = ?', ['sold', item_id]);

    res.json({ message: '訂單建立成功' });
  } catch (err) {
    console.error('❌ 建立訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 查詢使用者的訂單
exports.getOrders = async (req, res) => {
  const userId = req.user.id; // 從 JWT 中取得登入的使用者 ID

  try {
    const [orders] = await db.query(
      `SELECT o.*, i.name AS item_name, i.price, i.image_url FROM orders o
       LEFT JOIN items i ON o.item_id = i.id
       WHERE o.buyer_id = ? OR o.seller_id = ?
       ORDER BY o.created_at DESC`,
      [userId, userId]
    );

    res.json(orders);
  } catch (err) {
    console.error('❌ 查詢訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
