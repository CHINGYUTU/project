// middleware/verifyToken.js
module.exports = (req, res, next) => {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: '缺少 Bearer token（開發期可先隨便帶一個）' });
  }
  // 假裝已驗證，並把 user 放進 req
  req.user = { id: 2, role: 'user' };
  next();
};
