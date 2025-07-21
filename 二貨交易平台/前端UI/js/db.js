// 📦 負責與 MySQL 建立連線池並導出連線（供整個後端使用）

const mysql = require('mysql2/promise'); // ✅ 用 promise 模組
require('dotenv').config();              // 載入 .env 中的環境變數

// 建立 MySQL 連線池
const pool = mysql.createPool({
  host: 'localhost',             // 資料庫主機位置，例如 localhost
  user: 'root',             // 使用者名稱，例如 root
  password: '',         // 使用者密碼
  database: 'secondhand',         // 資料庫名稱
  waitForConnections: true,              // 如果連線數滿了則等待
  connectionLimit: 10,                   // 同時最多允許 10 條連線
  queueLimit: 0                          // 無限制佇列長度
});

// 匯出連線池，供其他檔案使用
module.exports = pool;
