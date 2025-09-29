const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointController');
const verifyToken = require('../middleware/verifyToken');

router.get('/total', verifyToken, pointController.getUserTotalPoints);
router.get('/history', verifyToken, pointController.getUserPointHistory);

module.exports = router;