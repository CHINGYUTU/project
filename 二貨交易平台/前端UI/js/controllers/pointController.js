const db = require('../db');

class Point {
  // 建立積分紀錄
  static async createPointRecord({ user_id, order_id, point_ac, add_cut }, conn = db) {
    // 查出目前總積分
    const [lastRecord] = await conn.query(
      'SELECT total_point FROM point WHERE user_id = ? ORDER BY id DESC LIMIT 1',
      [user_id]
    );

    let total_point = 0;
    if (lastRecord.length > 0) {
      total_point = lastRecord[0].total_point;
    }

    // 計算新的總積分
    if (add_cut === 'add') {
      total_point += point_ac;
    } else if (add_cut === 'cut') {
      total_point -= point_ac;
    }

    // 插入新紀錄
    const [result] = await conn.query(
      `INSERT INTO point (user_id, order_id, point_ac, add_cut, total_point, transaction_time)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [user_id, order_id, point_ac, add_cut, total_point]
    );

    return result.insertId;
  }

  // 判斷該訂單是否已經計算過積分
  static async isOrderPointsCalculated(order_id, conn = db) {
    const [rows] = await conn.query('SELECT id FROM point WHERE order_id = ?', [order_id]);
    return rows.length > 0;
  }

  // ================== API 功能 ==================

  // 取得使用者總積分
  static async getUserTotalPoints(req, res) {
    try {
      const userId = req.user.id;
      const [rows] = await db.query(
        'SELECT total_point FROM point WHERE user_id = ? ORDER BY id DESC LIMIT 1',
        [userId]
      );

      if (rows.length === 0) {
        return res.json({ total_point: 0 });
      }

      res.json({ total_point: rows[0].total_point });
    } catch (err) {
      console.error('❌ 獲取總積分錯誤:', err);
      res.status(500).json({ message: '伺服器錯誤' });
    }
  }

  // 取得使用者積分歷史紀錄
  static async getUserPointHistory(req, res) {
    try {
      const userId = req.user.id;
      const [rows] = await db.query(
        'SELECT add_cut, point_ac, total_point, transaction_time, order_id FROM point WHERE user_id = ? ORDER BY transaction_time DESC',
        [userId]
      );

      res.json(rows);
    } catch (err) {
      console.error('❌ 獲取積分歷史錯誤:', err);
      res.status(500).json({ message: '伺服器錯誤' });
    }
  }
}

module.exports = Point;
