// middleware/verifyToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // 取出 Bearer token

  if (!token) {
    return res.status(401).json({ message: '未提供登入憑證' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 存入 req.user 供後續使用
    next(); // 放行
  } catch (err) {
    return res.status(403).json({ message: '無效的憑證' });
  }
};
