const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add', verifyToken, cartController.addToCart);
router.delete('/remove/:itemId', verifyToken, cartController.removeFromCart);
router.get('/', verifyToken, cartController.getCartItems);
router.post('/checkout', verifyToken, cartController.checkout);

module.exports = router;
