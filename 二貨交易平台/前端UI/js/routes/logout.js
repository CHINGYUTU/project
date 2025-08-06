const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Session destroy failed:', err);
      return res.status(500).send('登出失敗');
    }

    res.clearCookie('connect.sid'); // 預設 session cookie 名稱
    res.redirect('/login'); // 登出後導回登入頁或首頁
  });
});

module.exports = router;