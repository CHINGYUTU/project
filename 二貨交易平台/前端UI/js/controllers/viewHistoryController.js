const db = require('../db');

// 新增瀏覽紀錄（避免重複並只保留 50 筆）
exports.addViewHistory = async (req, res) => {
  const userId = req.user.id;
  const { item_id } = req.body;

  try {
    // 刪除相同 item_id 的舊紀錄（避免重複）
    await db.query(
      'DELETE FROM view_history WHERE user_id = ? AND item_id = ?',
      [userId, item_id]
    );

    // 新增新的瀏覽紀錄
    await db.query(
      'INSERT INTO view_history (user_id, item_id, viewed_at) VALUES (?, ?, NOW())',
      [userId, item_id]
    );

    // 限制最多 50 筆
    await db.query(`
      DELETE FROM view_history 
      WHERE user_id = ? 
      AND id NOT IN (
        SELECT id FROM (
          SELECT id FROM view_history 
          WHERE user_id = ? 
          ORDER BY viewed_at DESC 
          LIMIT 50
        ) AS t
      )
    `, [userId, userId]);

    res.json({ success: true, message: '瀏覽紀錄已更新' });
  } catch (error) {
    console.error('❌ 新增瀏覽紀錄錯誤:', error);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
};

// 📌 取得最近瀏覽紀錄
exports.getRecentViewHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 5;

    // 修改SQL查詢以包含商品狀態
    const [rows] = await db.query(
      `SELECT vh.id, vh.viewed_at,
              i.id AS item_id, i.name AS item_name, i.description, i.price, 
              i.location, i.image_url, i.status,
              u.id AS seller_id, u.name AS seller_name, u.avatar_url AS seller_avatar
      FROM view_history vh
      JOIN items i ON vh.item_id = i.id
      JOIN users u ON i.user_id = u.id
      WHERE vh.user_id = ?
      ORDER BY vh.viewed_at DESC
      LIMIT ?`,
      [userId, limit]
    );

    res.json(rows);
    console.log("📌 查詢結果:", rows);
  } catch (error) {
    console.error("❌ 取得最近瀏覽紀錄錯誤:", error.sqlMessage || error.message);
    res.status(500).json({ message: "伺服器錯誤", error: error.message });
  }
};

// 📌 清除使用者的所有瀏覽紀錄
exports.clearViewHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    await db.query("DELETE FROM view_history WHERE user_id = ?", [userId]);

    res.json({ success: true, message: "瀏覽紀錄已清除" });
  } catch (error) {
    console.error("❌ 清除瀏覽紀錄錯誤:", error);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
};
