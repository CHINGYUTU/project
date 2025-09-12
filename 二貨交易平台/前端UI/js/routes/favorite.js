const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const verifyToken = require('../middleware/verifyToken');

// 切换收藏狀態（新增/取消）
router.post('/toggle', verifyToken, favoriteController.toggleFavorite);

// 移除收藏
router.delete('/remove/:itemId', verifyToken, favoriteController.removeFavorite);

// 查看收藏列表
router.get('/list', verifyToken, favoriteController.getFavorites);

module.exports = router;
