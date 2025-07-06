const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

// 📌 查詢所有分類（所有人可用）
router.get('/', categoryController.getAllCategories);

// 查詢所有分類（所有人可用）
router.get('/', categoryController.getAllCategories);

// 以下功能僅限 admin
router.post('/', categoryController.addCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
