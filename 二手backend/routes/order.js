const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

// ✅ POST /api/order：建立訂單（需登入）
router.post('/', verifyToken, orderController.createOrder);

// ✅ GET /api/order：查詢使用者的所有訂單（需登入）
router.get('/', verifyToken, orderController.getOrders);

module.exports = router;