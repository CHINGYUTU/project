const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

// 查詢個人訂單(僅限user)
router.get('/my-orders', verifyToken, orderController.getMyOrders); 

// 管理員查詢所有訂單
router.get('/all', verifyToken, orderController.getAllOrders);

// 建立訂單
router.post('/purchase', verifyToken, orderController.createOrder);

// 新增 API：拿完整的待確認訂單資訊
router.get("/pending-orders", verifyToken, orderController.getPendingOrdersWithDetails);

// 新增 API：拿完整的待交易訂單資訊（賣家專用）
router.get("/seller-confirmed-orders", verifyToken, orderController.getSellerConfirmedOrders);

// 新增訂單狀態更新路由
router.patch('/update-status/:orderId', verifyToken, orderController.updateOrderStatus);

// 查詢單筆訂單詳情（買家 / 賣家 / 管理員）
router.get('/:orderId', verifyToken, orderController.getOrderDetail);

// 修改訂單狀態
router.patch('/review/:orderId', verifyToken, orderController.reviewOrder);

// 完成訂單
router.patch('/complete/:orderId', verifyToken, orderController.completeOrder);

// 取消訂單
router.patch('/cancel/:orderId', verifyToken, orderController.cancelOrder);

module.exports = router;