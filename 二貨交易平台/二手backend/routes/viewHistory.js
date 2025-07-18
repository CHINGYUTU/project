const express = require('express');
const router = express.Router();
const viewHistoryController = require('../controllers/viewHistoryController');
const verifyToken = require('../middleware/verifyToken');

// 新增瀏覽紀錄
router.post('/', verifyToken, viewHistoryController.addViewHistory);

// 取得瀏覽紀錄
router.get('/', verifyToken, viewHistoryController.getViewHistory);

// 清除瀏覽紀錄
router.delete('/', verifyToken, viewHistoryController.clearViewHistory);

module.exports = router;
