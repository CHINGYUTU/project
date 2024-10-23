const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: '10.1.1.3',
  port: 3333,
  user: 'ZackTopic',
  password: '2wsx!QAZ',
  database: 'ZackTopic',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;