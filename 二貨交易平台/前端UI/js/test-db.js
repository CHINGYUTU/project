// test-db.js
const db = require('./db');

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ 資料庫連線成功！結果:', rows[0]);
  } catch (err) {
    console.error('❌ 無法連接資料庫：', err);
  }
})();