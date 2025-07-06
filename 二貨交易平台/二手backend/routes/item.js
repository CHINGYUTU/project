const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// ✅ 上架商品
router.post('/add', itemController.addItem);

// ✅ 查詢所有上架中商品
router.get('/available', itemController.getAvailableItems);

module.exports = router;
