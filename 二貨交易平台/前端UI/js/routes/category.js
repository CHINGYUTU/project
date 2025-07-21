const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


// 📌 查詢所有分類（所有人可用）
router.get('/', categoryController.getAllCategories);

module.exports = router;
