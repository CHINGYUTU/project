const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 設定 Multer 上傳訊息圖片
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/messages/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 📌 送出訊息 (支援文字 + 圖片)
router.post('/send', verifyToken, upload.single('image'), messageController.sendMessage);

// 📌 取得與某人的聊天紀錄
router.get('/', verifyToken, messageController.getMessagesWithUser);

// 📌 標記訊息已讀
router.put('/read', verifyToken, messageController.markAsRead);

module.exports = router;
