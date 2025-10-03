const db = require('../db');

class Point {
  // 新增積分記錄
  static async createPointRecord(pointData, conn = null) {
    const { user_id, order_id, point_ac, add_cut } = pointData;
    const executor = conn || db; // 如果有傳 conn，用同一個 transaction

    const sql = `
      INSERT INTO point (user_id, order_id, point_ac, add_cut, Point, transaction_time) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    
    const [result] = await executor.query(sql, [user_id, order_id, point_ac, add_cut, point_ac]);
    return result;
  }

  // 獲取使用者總積分
  static async getUserTotalPoints(userId, conn = null) {
    const executor = conn || db;
    const sql = `
      SELECT SUM(CASE WHEN add_cut = 'add' THEN point_ac ELSE -point_ac END) as total_points 
      FROM point 
      WHERE user_id = ?
    `;
    
    const [result] = await executor.query(sql, [userId]);
    return result[0]?.total_points || 0;
  }

  // 獲取使用者的積分明細
  static async getUserPointHistory(userId, conn = null) {
    const executor = conn || db;
    const sql = `
      SELECT p.*, o.id as order_id, i.name as item_name
      FROM point p
      LEFT JOIN orders o ON p.order_id = o.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN items i ON oi.item_id = i.id
      WHERE p.user_id = ?
      ORDER BY p.transaction_time DESC
    `;
    
    const [result] = await executor.query(sql, [userId]);
    return result;
  }

  // 檢查訂單是否已經計算過積分
  static async isOrderPointsCalculated(orderId, conn = null) {
    const executor = conn || db;
    const sql = 'SELECT id FROM point WHERE order_id = ? LIMIT 1';
    const [result] = await executor.query(sql, [orderId]);
    return result.length > 0;
  }
}

// 測試程式碼（可於測試後移除）
(async () => {
  try {
    const result = await Point.isOrderPointsCalculated(60);
    console.log('isOrderPointsCalculated result:', result);
  } catch (err) {
    console.error('Test error:', err);
  }
})();

module.exports = Point;
