const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: '1.170.152.134',
  port: 3333,
  user: 'ZackTopic',
  password: '2wsx!QAZ',
  database: 'ZackTopic',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;