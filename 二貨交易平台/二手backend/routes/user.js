const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const userController = require('../controllers/userController');
const { uploadAvatar } = require('../middleware/upload');

// 修改密碼
router.patch('/change-password', verifyToken, userController.changePassword);

// 上傳 / 更新大頭貼
router.patch('/avatar', verifyToken, uploadAvatar.single('avatar'), userController.updateAvatar);

module.exports = router;
