const db = require('../db');

// 📌 加入收藏
exports.addFavorite = async (req, res) => {
  const userId = req.user.id;
  const { item_id } = req.body;

  try {
    const [existing] = await db.query(
      'SELECT * FROM favorites WHERE user_id = ? AND item_id = ?',
      [userId, item_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: '已經收藏過此商品' });
    }

    await db.query(
      'INSERT INTO favorites (user_id, item_id) VALUES (?, ?)',
      [userId, item_id]
    );

    res.json({ message: '收藏成功' });
  } catch (err) {
    console.error('❌ 收藏錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 移除收藏
exports.removeFavorite = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.itemId;

  try {
    const [result] = await db.query(
      'DELETE FROM favorites WHERE user_id = ? AND item_id = ?',
      [userId, itemId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '未收藏該商品' });
    }

    res.json({ message: '已移除收藏' });
  } catch (err) {
    console.error('❌ 移除收藏錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 查看所有收藏商品
exports.getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      `SELECT i.* FROM favorites f
       JOIN items i ON f.item_id = i.id
       WHERE f.user_id = ?`,
      [userId]
    );

    res.json({ message: '收藏查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢收藏錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
