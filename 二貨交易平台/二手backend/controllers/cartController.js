const db = require('../db');

// 📌 加入購物車
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { item_id } = req.body;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法使用購物車' });
  }

  try {
    const [items] = await db.query(
      'SELECT * FROM items WHERE id = ? AND status = "available"',
      [item_id]
    );
    if (items.length === 0) {
      return res.status(400).json({ message: '商品不存在或已售出' });
    }

    const [existing] = await db.query(
      'SELECT * FROM cart_items WHERE user_id = ? AND item_id = ?',
      [userId, item_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: '商品已在購物車中' });
    }

    await db.query('INSERT INTO cart_items (user_id, item_id) VALUES (?, ?)', [userId, item_id]);
    res.json({ message: '商品已加入購物車' });
  } catch (err) {
    console.error('❌ 加入購物車錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 移除購物車項目
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  try {
    const [result] = await db.query(
      'DELETE FROM cart_items WHERE user_id = ? AND item_id = ?',
      [userId, itemId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '購物車中無此商品' });
    }
    res.json({ message: '已從購物車移除商品' });
  } catch (err) {
    console.error('❌ 移除購物車錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 查看購物車內容
exports.getCartItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      `SELECT items.* FROM cart_items
       JOIN items ON cart_items.item_id = items.id
       WHERE cart_items.user_id = ? AND items.status = 'available'`,
      [userId]
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢購物車錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 結帳購物車（建立多筆 pending 訂單）
exports.checkout = async (req, res) => {
  const userId = req.user.id;

  try {
    const [cartItems] = await db.query(
      `SELECT items.id AS item_id, items.user_id AS seller_id
       FROM cart_items
       JOIN items ON cart_items.item_id = items.id
       WHERE cart_items.user_id = ? AND items.status = 'available'`,
      [userId]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ message: '購物車為空或商品已售出' });
    }

    for (const item of cartItems) {
      // 1. 建立 pending 訂單
      await db.query(
        `INSERT INTO orders (item_id, buyer_id, seller_id, status, created_at)
         VALUES (?, ?, ?, 'pending', NOW())`,
        [item.item_id, userId, item.seller_id]
      );

      // 2. 更新商品狀態為 reserved
      await db.query('UPDATE items SET status = "reserved" WHERE id = ?', [item.item_id]);
    }

    // 3. 清空購物車
    await db.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);

    res.json({ message: '結帳成功，訂單建立中（等待賣家確認）' });
  } catch (err) {
    console.error('❌ 結帳錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};
