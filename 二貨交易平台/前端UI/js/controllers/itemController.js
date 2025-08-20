const db = require('../db');

// 📌 上架商品
exports.addItem = async (req, res) => {
  const { name, description, price, category_id, location} = req.body;
  const userId = req.user.id;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null; // 統一使用根目錄路徑

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法上架商品' });
  }

  try {
    await db.query(
      `INSERT INTO items (name, description, price, category_id, user_id, image_url, location, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?,  'available', NOW())`,
      [name, description, price, category_id, userId, image_url, location]
    );
    res.json({ message: '商品上架成功' });
  } catch (err) {
    console.error('❌ 商品上架錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 編輯商品（僅限賣家本人）
exports.updateItem = async (req, res) => {

  const itemId = req.params.id;
  const userId = req.user.id;
  const { name, description, price, category_id, location } = req.body;
  const existingImage = rows[0].image_url;
  const image_url = req.file ? `/uploads/${req.file.filename}` : existingImage;

  try {
    // 取得原本商品資料
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [itemId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到該商品' });
    }

    const item = rows[0];

    // 檢查是否為賣家本人
    if (item.user_id !== userId) {
      return res.status(403).json({ message: '只能由上架的賣家本人修改' });
    }

    // 更新資料
    const updatedFields = {
      name: name || item.name,
      description: description || item.description,
      price: price || item.price,
      category_id: category_id || item.category_id,
      location: location || item.location,
      image_url: image_url || item.image_url
    };

    await db.query(
      `UPDATE items
       SET name = ?, description = ?, price = ?, category_id = ?, location = ?, image_url = ?
       WHERE id = ?`,
      [
        updatedFields.name,
        updatedFields.description,
        updatedFields.price,
        updatedFields.category_id,
        updatedFields.location,
        updatedFields.image_url,
        itemId
      ]
    );

    res.json({ message: '商品已成功更新' });
  } catch (err) {
    console.error('❌ 編輯商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
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
    const [rows] = await db.query(`
      SELECT 
        id, name, description, price, category_id,
        IFNULL(image_url, 'default-product.png') AS image_url,
        location, status
      FROM items
      WHERE user_id = ?
    `, [userId]
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
    //查無商品
    const [rows] = await db.query(query, params);
      if (rows.length === 0) {
      return res.status(404).json({ message: '查無此商品'});
    }
    //查詢成功
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
