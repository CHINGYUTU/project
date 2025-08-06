const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { uploadAvatar } = require('../middleware/upload');

// ✅ 測試用
router.get('/test', verifyToken, (req, res) => {
  console.log("✅ test route req.user:", req.user);
  res.json({ message: 'Test success', user: req.user });
});

router.get('/ping', (req, res) => res.json({ message: 'pong' }));

// ✅ 取得個人資料
router.get('/profile', verifyToken, userController.getProfile);

// 🔒 修改名稱、信箱
router.patch('/profile', verifyToken, userController.updateProfile);

// 🔒 驗證新信箱
router.get('/verify-email-change', authController.verifyEmail);

// 🔒 修改密碼
router.patch('/change-password', verifyToken, userController.changePassword);

// ✅ 驗證舊密碼
router.post('/verify-password', verifyToken, userController.verifyPassword);

// 🔒 上傳 / 更新大頭貼
router.patch('/avatar', verifyToken, uploadAvatar.single('avatar'), userController.updateAvatar);

// ✅ 只保留這一個 export
module.exports = router;
