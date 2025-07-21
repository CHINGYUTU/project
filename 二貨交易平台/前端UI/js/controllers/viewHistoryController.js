const db = require('../db');

// 新增瀏覽紀錄（避免重複並只保留 50 筆）
exports.addViewHistory = async (req, res) => {
  const userId = req.user.id;
  const { item_id } = req.body;

  try {
    // 先刪除相同 item_id 的舊紀錄（避免重複）
    await db.query(
      'DELETE FROM view_history WHERE user_id = ? AND item_id = ?',
      [userId, item_id]
    );

    // 新增新的瀏覽紀錄
    await db.query(
      'INSERT INTO view_history (user_id, item_id, viewed_at) VALUES (?, ?, NOW())',
      [userId, item_id]
    );

    // 保留最新 50 筆，其餘刪除
    await db.query(
      `DELETE FROM view_history 
       WHERE user_id = ? AND id NOT IN (
         SELECT id FROM (
           SELECT id FROM view_history 
           WHERE user_id = ? 
           ORDER BY viewed_at DESC 
           LIMIT 50
         ) AS latest
       )`,
      [userId, userId]
    );

    res.status(200).json({ message: '已記錄瀏覽紀錄' });
  } catch (err) {
    console.error('❌ 新增瀏覽紀錄錯誤:', err);
    res.status(500).json({ message: '無法新增瀏覽紀錄' });
  }
};

//  取得使用者的瀏覽紀錄（最新優先）
exports.getViewHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const [history] = await db.query(
      `SELECT i.id AS item_id, i.name, i.description, i.price, i.image_url, i.category_id, i.location, i.status, i.created_at
       FROM view_history vh
       JOIN items i ON vh.item_id = i.id
       WHERE vh.user_id = ?
       ORDER BY vh.viewed_at DESC`,
      [userId]
    );
    res.json(history);
  } catch (err) {
    console.error('❌ 取得瀏覽紀錄錯誤:', err);
    res.status(500).json({ message: '無法取得瀏覽紀錄' });
  }
};

// ✅ 清除使用者的所有瀏覽紀錄
exports.clearViewHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    await db.query('DELETE FROM view_history WHERE user_id = ?', [userId]);
    res.json({ message: '已清除所有瀏覽紀錄' });
  } catch (err) {
    console.error('❌ 清除瀏覽紀錄錯誤:', err);
    res.status(500).json({ message: '無法清除瀏覽紀錄' });
  }
};
