const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { uploadCommentImage } = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken'); 

// 建立評論（含圖片）
router.post('/', verifyToken, uploadCommentImage, reviewController.createReview);

// 取得某賣家的所有評論
router.get('/seller/:sellerId', reviewController.getReviewsBySeller);

// 編輯評論（可更新圖片）
router.put('/:reviewId', verifyToken, uploadCommentImage, reviewController.updateReview);

// 賣家回覆評論
router.put('/reply/:reviewId', verifyToken, reviewController.replyToReview);

//管理員刪除評論
router.delete('/:reviewId', verifyToken, reviewController.deleteReview);

module.exports = router;
