const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('../middleware/verifyToken');
const { uploadItemImage } = require('../middleware/upload');


// 🔒 需登入才可使用的功能
// 📌 上架商品（僅限一般使用者且附帶圖片）
router.post('/add', verifyToken, uploadItemImage.single('image'), itemController.addItem);

//修改商品資訊(僅限賣家)
router.patch('/:id', verifyToken, uploadItemImage.single('image'), itemController.updateItem);

// 📌 刪除商品（限賣家本人或管理員）
router.delete('/:id', verifyToken, itemController.deleteItem);

// 📌 查詢個人上架商品（限一般使用者）
router.get('/my-items', verifyToken, itemController.getMyItems);

// 📌 查詢所有商品（僅限管理員）
router.get('/all', verifyToken, itemController.getAllItems);

// 📌 查詢所有上架中商品（所有人皆可用，不需要登入）
router.get('/available', itemController.getAvailableItems);

// 📌 搜尋商品（可用分類或關鍵字，開放所有人）
router.get('/search', itemController.searchItems);

module.exports = router;
