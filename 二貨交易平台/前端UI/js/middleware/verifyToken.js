const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未提供有效的憑證' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔐 verifyToken decoded:', decoded);
    req.user = decoded; // ✅ 把解出來的 user 寫進 req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: '無效的 Token' });
  }
};
