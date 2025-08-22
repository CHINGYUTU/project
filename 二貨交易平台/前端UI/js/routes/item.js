const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('../middleware/verifyToken');
const { uploadItemImage } = require('../middleware/upload');

// 🔒 需登入才可使用的功能
// 📌 上架商品（僅限一般使用者且附帶圖片，狀態 = pending）
router.post('/add', verifyToken, uploadItemImage.single('image'), itemController.addItem);

// 📌 修改商品（重新進入 pending）
router.patch('/:id', verifyToken, uploadItemImage.single('image'), itemController.updateItem);

// 📌 刪除商品（限賣家本人或管理員）
router.delete('/:id', verifyToken, itemController.deleteItem);

// 📌 查詢個人上架商品（賣家可看到自己 pending / available 的商品）
router.get('/my-items', verifyToken, itemController.getMyItems);

// 📌 查詢所有商品（僅限管理員）
router.get('/all', verifyToken, itemController.getAllItems);

// 📌 管理員審核商品（approve/reject）
router.patch('/review/:id', verifyToken, itemController.reviewItem);

 // 獲取待審核商品
router.get('/admin/pending', verifyToken, itemController.getPendingItems);

// 📌 查詢所有上架中商品（開放所有人）
router.get('/available', itemController.getAvailableItems);

// 📌 搜尋商品（僅 available，開放所有人）
router.get('/search', itemController.searchItems);

module.exports = router;
