const db = require('../db');

// 📌 上架商品
exports.addItem = async (req, res) => {
  const { name, description, price, category_id, image_url } = req.body;
  const userId = req.user.id;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法上架商品' });
  }

  try {
    await db.query(
      `INSERT INTO items (name, description, price, category_id, user_id, image_url, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'available', NOW())`,
      [name, description, price, category_id, userId, image_url]
    );
    res.json({ message: '商品上架成功' });
  } catch (err) {
    console.error('❌ 商品上架錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 查詢所有上架中商品（開放給所有使用者）
exports.getAvailableItems = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT i.*, c.name AS category_name
       FROM items i
       JOIN categories c ON i.category_id = c.id
       WHERE i.status = 'available'
       ORDER BY i.created_at DESC`
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 賣家查看自己上架的商品
exports.getMyItems = async (req, res) => {
  const userId = req.user.id;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法查看個人商品' });
  }

  try {
    const [rows] = await db.query(
      `SELECT i.*, c.name AS category_name
       FROM items i
       JOIN categories c ON i.category_id = c.id
       WHERE i.user_id = ?
       ORDER BY i.created_at DESC`,
      [userId]
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢個人商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 管理員審查所有商品
exports.getAllItems = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以查看所有商品' });
  }

  try {
    const [rows] = await db.query(
      `SELECT i.*, c.name AS category_name
       FROM items i
       JOIN categories c ON i.category_id = c.id
       ORDER BY i.created_at DESC`
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢所有商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 刪除商品（限賣家本人或管理員）
exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [itemId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到該商品' });
    }

    const item = rows[0];
    if (userRole !== 'admin' && item.user_id !== userId) {
      return res.status(403).json({ message: '無刪除權限' });
    }

    await db.query('DELETE FROM items WHERE id = ?', [itemId]);
    res.json({ message: '商品已刪除' });
  } catch (err) {
    console.error('❌ 刪除商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 根據分類與關鍵字查詢商品
exports.searchItems = async (req, res) => {
  const { category, keyword } = req.query;

  try {
    let query = `SELECT i.*, c.name AS category_name 
                 FROM items i
                 JOIN categories c ON i.category_id = c.id
                 WHERE i.status = 'available'`;
    const params = [];

    if (category) {
      query += ` AND i.category_id = ?`;
      params.push(category);
    }

    if (keyword) {
      query += ` AND (i.name LIKE ? OR i.description LIKE ?)`;
      const fuzzy = `%${keyword}%`;
      params.push(fuzzy, fuzzy);
    }

    query += ` ORDER BY i.created_at DESC`;

    const [rows] = await db.query(query, params);
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
