const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const points = require('../controllers/pointsController');

router.get('/balance', verifyToken, points.getBalance);
router.get('/rewards', verifyToken, points.listRewards);
router.post('/earn-trade', verifyToken, points.earnTrade);
router.post('/redeem', verifyToken, points.redeem);

module.exports = router;
