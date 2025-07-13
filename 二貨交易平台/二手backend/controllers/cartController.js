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
      `SELECT items.*
       FROM cart_items
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

// 📌 結帳購物車（依賣家分組建立訂單、建立 order_items、更新商品狀態、清空購物車、total_price）
exports.checkout = async (req, res) => {
  const userId = req.user.id;
  const { item_ids } = req.body; // ⬅️ 傳入欲結帳的商品 ID 陣列

  if (!Array.isArray(item_ids) || item_ids.length === 0) {
    return res.status(400).json({ message: '請提供要結帳的商品 ID 陣列' });
  }

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    // 查詢指定商品，確認屬於購物車且尚未售出
    const [cartItems] = await conn.query(
      `SELECT c.item_id, i.user_id AS seller_id, i.price, i.name, i.location
      FROM cart_items c
      JOIN items i ON c.item_id = i.id
      WHERE c.user_id = ? AND c.item_id IN (?) AND i.status = 'available'`,
      [userId, item_ids]
    );


    if (cartItems.length !== item_ids.length) {
      await conn.rollback();
      return res.status(400).json({ message: '部分商品不存在、未在購物車中或已售出' });
    }

    // 分組商品（依據 seller_id）
    const grouped = {};
    for (const item of cartItems) {
      if (!grouped[item.seller_id]) {
        grouped[item.seller_id] = [];
      }
      grouped[item.seller_id].push(item);
    }

    const createdOrders = [];

    // 為每位賣家建立訂單
    for (const sellerId in grouped) {
      const items = grouped[sellerId];
      const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

      // 建立訂單
      const [orderResult] = await conn.query(
        `INSERT INTO orders (buyer_id, seller_id, status, total_price, created_at)
         VALUES (?, ?, 'pending', ?, NOW())`,
        [userId, sellerId, totalPrice]
      );
      const orderId = orderResult.insertId;

      // 建立 order_items
     const orderItemValues = items.map(item => [orderId, item.item_id, item.name, item.price, item.location]);
     await conn.query(
        `INSERT INTO order_items (order_id, item_id, item_name, price, location) VALUES ?`,
        [orderItemValues]
     );

      // 更新商品狀態為 reserved
      const itemIdList = items.map(item => item.item_id);
      await conn.query(
        `UPDATE items SET status = 'reserved' WHERE id IN (?)`,
        [itemIdList]
      );

      // 從購物車中移除
      await conn.query(
        `DELETE FROM cart_items WHERE user_id = ? AND item_id IN (?)`,
        [userId, itemIdList]
      );

      createdOrders.push({
        order_id: orderId,
        seller_id: sellerId,
        total_price: totalPrice,
        items: items.map(i => ({ id: i.item_id, name: i.name, price: i.price, location: i.location }))
      });
    }

    await conn.commit();
    res.json({ message: '部分商品結帳成功', orders: createdOrders });
  } catch (err) {
    await conn.rollback();
    console.error('❌ 部分結帳錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  } finally {
    conn.release();
  }
};
