const db = require('../db');
// 添加商品狀態常量
const ITEM_STATUS = {
  PENDING: 'pending',
  AVAILABLE: 'available',
  REJECTED: 'rejected',
  SOLD: 'sold',
  RESERVED: 'reserved'
};

// 📌 上架商品（初始狀態：pending，待管理員審核）
exports.addItem = async (req, res) => {
  const { name, description, price, category_id, location } = req.body;
  const userId = req.user.id;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法上架商品' });
  }

  try {
    // 修正：添加 status 參數到數組中
    await db.query(
      `INSERT INTO items (name, description, price, category_id, user_id, image_url, location, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,  // 改成9個佔位符
      [name, description, price, category_id, userId, image_url, location, 'pending'] // 添加 'pending' 參數
    );
    res.json({ message: '商品上架成功，待管理員審核' });
  } catch (err) {
    console.error('❌ 商品上架錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 編輯商品（若重新上傳圖片或修改重要信息則重新進入 pending 狀態）
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
    const image_url = req.file ? `/uploads/${req.file.filename}` : existingImage;
    
    // 檢查是否需要重新審核（圖片變更或重要信息變更）
    const needsReapproval = req.file || 
                           name !== item.name || 
                           price !== item.price || 
                           category_id !== item.category_id;

    const updatedFields = {
      name: name || item.name,
      description: description || item.description,
      price: price || item.price,
      category_id: category_id || item.category_id,
      location: location || item.location,
      image_url: image_url || item.image_url,
      status: needsReapproval ? ITEM_STATUS.PENDING : item.status // 條件性更新狀態
    };

    await db.query(
      `UPDATE items
       SET name = ?, description = ?, price = ?, category_id = ?, 
           location = ?, image_url = ?, status = ?, reviewed_at = NULL, review_notes = NULL
       WHERE id = ?`,
      [
        updatedFields.name,
        updatedFields.description,
        updatedFields.price,
        updatedFields.category_id,
        updatedFields.location,
        updatedFields.image_url,
        updatedFields.status,
        itemId,
      ]
    );

    const message = needsReapproval 
      ? '商品已更新，待管理員重新審核' 
      : '商品已更新';
      
    res.json({ message, needsReapproval });
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
       WHERE i.status = ?  // 使用參數化查詢
       ORDER BY i.created_at DESC`,
      [ITEM_STATUS.AVAILABLE]  // 使用常量
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢商品錯誤:', err);
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
        i.*, 
        c.name AS category_name,
        IFNULL(i.image_url, 'default-product.png') AS image_url
      FROM items i
      JOIN categories c ON i.category_id = c.id
      WHERE i.user_id = ?
      ORDER BY 
        CASE i.status 
          WHEN 'pending' THEN 1
          WHEN 'available' THEN 2
          WHEN 'rejected' THEN 3
          WHEN 'sold' THEN 4
        END,
        i.created_at DESC
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

// 📌 獲取所有待審核商品（僅管理員）
exports.getPendingItems = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以查看待審核商品' });
  }

  try {
    const [rows] = await db.query(
      `SELECT i.*, u.username AS seller_name, c.name AS category_name
       FROM items i
       JOIN users u ON i.user_id = u.id
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

// 📌 管理員審核商品（通過/拒絕）
exports.reviewItem = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以審核商品' });
  }

  const itemId = req.params.id;
  const { action, review_notes } = req.body; // 添加審核備註

  try {
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [itemId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到該商品' });
    }

    let newStatus;
    if (action === 'approve') {
      newStatus = ITEM_STATUS.AVAILABLE;
    } else if (action === 'reject') {
      newStatus = ITEM_STATUS.REJECTED;
    } else {
      return res.status(400).json({ message: '無效的審核動作' });
    }

    // 更新狀態、審核時間和備註
    await db.query(
      `UPDATE items SET status = ?, reviewed_at = NOW(), review_notes = ? WHERE id = ?`, 
      [newStatus, review_notes || null, itemId]
    );

    res.json({ 
      message: `商品已${action === 'approve' ? '審核通過' : '拒絕上架'}`,
      status: newStatus
    });
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
