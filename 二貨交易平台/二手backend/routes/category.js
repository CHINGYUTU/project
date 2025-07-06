const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

// 📌 查詢所有分類（所有人可用）
router.get('/', categoryController.getAllCategories);

// 📌 以下功能需登入且身分為 admin
router.post('/', verifyToken, categoryController.addCategory);
router.patch('/:id', verifyToken, categoryController.updateCategory);
router.delete('/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;
