const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

// 購買商品(僅限user)
router.post('/buy', verifyToken, orderController.purchaseItem);

// 查詢個人訂單(僅限user)
router.get('/my-orders', verifyToken, orderController.getMyOrders); 

// 管理員查詢所有訂單
router.get('/all', verifyToken, orderController.getAllOrders);

// ⭐ 新增訂單狀態更新路由
router.patch('/update-status/:orderId', verifyToken, orderController.updateOrderStatus);

module.exports = router;
