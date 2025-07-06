const db = require('../db');

// 📌 新增分類（限 admin）
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以新增分類' });
  }

  try {
    // 🟡 檢查是否已存在同名分類
    const [exists] = await db.query('SELECT * FROM categories WHERE name = ?', [name]);
    if (exists.length > 0) {
      return res.status(409).json({ message: '分類名稱已存在' });
    }

    // ✅ 若無重複，執行新增
    await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.json({ message: '分類新增成功' });
  } catch (err) {
    console.error('❌ 新增分類錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};


// 📌 編輯分類名稱（限 admin）
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以修改分類' });
  }

  try {
    const [result] = await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '找不到該分類' });
    }
    res.json({ message: '分類名稱更新成功' });
  } catch (err) {
    console.error('❌ 修改分類錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 刪除分類（限 admin）
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以刪除分類' });
  }

  try {
    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '找不到該分類' });
    }
    res.json({ message: '分類刪除成功' });
  } catch (err) {
    console.error('❌ 刪除分類錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 查詢所有分類（任何使用者都可以）
exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('❌ 查詢分類錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};
