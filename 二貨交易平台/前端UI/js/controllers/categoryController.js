const db = require('../db');

// 📌 查詢所有分類（任何使用者都可以）
exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('❌ 查詢分類錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};
