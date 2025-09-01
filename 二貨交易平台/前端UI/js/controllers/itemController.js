const db = require('../db');

// 📌 上架商品（初始狀態：pending，待管理員審核）
exports.addItem = async (req, res) => {
  const { name, description, price, category_id, location } = req.body;
  const userId = req.user.id;
  const image_url = req.file ? `/items/${req.file.filename}` : null;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法上架商品' });
  }

  try {
    await db.query(
      `INSERT INTO items (name, description, price, category_id, user_id, image_url, location, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,  // ⚠️ 改成 pending
      [name, description, price, category_id, userId, image_url, location]
    );
    res.json({ message: '商品上架成功，待管理員審核' });
  } catch (err) {
    console.error('❌ 商品上架錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 編輯商品（僅限賣家本人，若重新上傳則重新進入 pending 狀態）
exports.updateItem = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user.id;
  const { name, description, price, category_id, location } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [itemId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到該商品' });
    }

    const item = rows[0];
    if (item.user_id !== userId) {
      return res.status(403).json({ message: '只能由上架的賣家本人修改' });
    }

    const existingImage = item.image_url;
    const image_url = req.file ? `/items/${req.file.filename}` : existingImage;

    const updatedFields = {
      name: name || item.name,
      description: description || item.description,
      price: price || item.price,
      category_id: category_id || item.category_id,
      location: location || item.location,
      image_url: image_url || item.image_url,
    };

    await db.query(
      `UPDATE items
       SET name = ?, description = ?, price = ?, category_id = ?, location = ?, image_url = ?, status = 'pending'
       WHERE id = ?`,
      [
        updatedFields.name,
        updatedFields.description,
        updatedFields.price,
        updatedFields.category_id,
        updatedFields.location,
        updatedFields.image_url,
        itemId,
      ]
    );

    res.json({ message: '商品已更新，待管理員重新審核' });
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

// 修改商品狀態
exports.updateStatus = async (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body; // 前端傳入新的狀態
  const userId = req.user.id;  // 從 token 取得登入者 id
  const userRole = req.user.role; // 從 token 取得登入者角色 (admin / user)

  try {
    // 如果是 admin → 可以修改任何商品狀態
    // 如果是一般 user → 只能修改自己上架的商品
    let query = 'UPDATE items SET status = ? WHERE id = ?';
    let params = [status, itemId];

    if (userRole !== 'admin') {
      query += ' AND user_id = ?';
      params.push(userId);
    }

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: '無權限修改或商品不存在' });
    }

    res.json({ message: '商品狀態已更新' });
  } catch (error) {
    console.error('❌ 修改商品狀態失敗:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 查詢所有待審核的商品 (管理員用)
exports.getPendingItems = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT i.*, c.name AS category_name
       FROM items i
       JOIN categories c ON i.category_id = c.id
       WHERE i.status = 'pending'
       ORDER BY i.created_at DESC`
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢待審核商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 賣家查看自己上架的商品（可看到 pending 與 available）
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
    `, [userId]);

    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢個人商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 管理員審查所有商品（包含 pending, available, sold）
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

// 📌 管理員審核商品（通過/拒絕）
exports.reviewItem = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以審核商品' });
  }

  const itemId = req.params.id;
  const { action } = req.body; // "approve" 或 "reject"

  try {
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [itemId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到該商品' });
    }

    let newStatus;
    if (action === 'approve') {
      newStatus = 'available';
    } else if (action === 'reject') {
      newStatus = 'rejected';
    } else {
      return res.status(400).json({ message: '無效的審核動作' });
    }

    await db.query(`UPDATE items SET status = ? WHERE id = ?`, [newStatus, itemId]);

    res.json({ message: `商品已${action === 'approve' ? '審核通過' : '拒絕上架'}` });
  } catch (err) {
    console.error('❌ 商品審核錯誤:', err);
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

// 📌 根據分類與關鍵字查詢商品（僅 available）
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
    if (rows.length === 0) {
      return res.status(404).json({ message: '查無此商品' });
    }

    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
