const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken'); 

// ✅ POST /register：註冊新帳號
router.post('/register', authController.register);
// ✅ POST /login：登入帳號
router.post('/login', authController.login);
// ✅ GET /verify：信箱驗證連結
// 例如網址：http://localhost:3000/api/auth/verify?token=xxxxx
router.get('/verify', authController.verifyEmail);
// ✅ POST /forgot-password：使用者忘記密碼，寄出重設密碼信
router.post('/forgot-password', authController.forgotPassword);
// ✅ POST /reset-password：未登入、使用重設密碼信重設密碼
router.post('/reset-password', authController.resetPassword);
// ✅ POST /update-password：使用者登入狀態下修改密碼（新密碼不得與舊密碼重複）
router.post('/update-password', verifyToken, authController.updatePassword);

module.exports = router;
