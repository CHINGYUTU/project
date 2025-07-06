const db = require('../db');

// 📌 上架商品
exports.addItem = async (req, res) => {
  const { name, description, price, category, seller_id, image_url } = req.body;

  try {
    await db.query(
      `INSERT INTO items (name, description, price, category, seller_id, image_url, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'available', NOW())`,
      [name, description, price, category, seller_id, image_url]
    );
    res.json({ message: '商品上架成功' });
  } catch (err) {
    console.error('❌ 商品上架錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 查詢所有上架中商品
exports.getAvailableItems = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM items WHERE status = 'available' ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ 查詢商品錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
