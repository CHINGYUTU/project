const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add', verifyToken, cartController.addToCart);//加入購物車
router.delete('/remove/:itemId', verifyToken, cartController.removeFromCart);//移除購物車內某商品
router.get('/', verifyToken, cartController.getCartItems);//查詢購物車
router.post('/checkout', verifyToken, cartController.checkout);//結帳

module.exports = router;
