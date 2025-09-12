const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const viewHistoryController = require('../controllers/viewHistoryController');

// 新增瀏覽紀錄
router.post('/add', verifyToken, viewHistoryController.addViewHistory);

// 取得最近瀏覽紀錄
router.get('/recent', verifyToken, viewHistoryController.getRecentViewHistory);

// 清除瀏覽紀錄
router.delete('/clear', verifyToken, viewHistoryController.clearViewHistory);

module.exports = router;