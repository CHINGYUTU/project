const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const messageController = require('../controllers/messageController');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/messages/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 健康檢查 & 驗證確認
router.get('/ping', (req, res) => res.json({ ok: true }));
router.get('/whoami', verifyToken, (req, res) => res.json({ user: req.user }));

// ① 取得和對方的訊息（可帶 item_id）
router.get('/', verifyToken, messageController.getMessagesWithUser);

// ② 送出訊息（文字或圖片），圖片欄位名：image
router.post('/send', verifyToken, upload.single('image'), messageController.sendMessage);

// ③ 標記已讀
router.put('/read', verifyToken, messageController.markAsRead);

module.exports = router;
