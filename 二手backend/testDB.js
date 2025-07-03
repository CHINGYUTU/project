const db = require('./db');

async function testDB() {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('✅ 成功連接 MySQL 資料庫');
  } catch (err) {
    console.error('❌ 連線失敗：', err);
  }
}

testDB();