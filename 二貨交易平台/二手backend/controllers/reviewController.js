const db = require('../db');
const fs = require('fs');
const path = require('path');
const { sendMail } = require('../utils/sendMail');

// 建立評論
exports.createReview = async (req, res) => {
  const buyerId = req.user.id;
  const { order_id, rating, comment } = req.body;
  const imageUrls = req.files.map(file => `/uploads/reviews/${file.filename}`);

  try {
    // 從訂單查出賣家 ID
    const [[order]] = await db.query(
      'SELECT * FROM orders WHERE id = ? AND buyer_id = ? AND status = "completed"',
      [order_id, buyerId]
    );

    if (!order) {
      return res.status(403).json({ message: '您尚未完成此訂單或查無訂單' });
    }

    const seller_id = order.seller_id;

    // 檢查是否已針對此訂單評論
    const [existing] = await db.query('SELECT * FROM reviews WHERE order_id = ?', [order_id]);
    if (existing.length > 0) {
      return res.status(400).json({ message: '此訂單已提交過評論' });
    }

    // ✅ 新增評論
    await db.query(`
      INSERT INTO reviews (buyer_id, seller_id, order_id, rating, comment, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [buyerId, seller_id, order_id, rating, comment, JSON.stringify(imageUrls)]);

    // ✅ 查詢賣家 email & 購買者資訊
    const [[seller]] = await db.query('SELECT email, name FROM users WHERE id = ?', [seller_id]);
    const [[buyer]] = await db.query('SELECT name FROM users WHERE id = ?', [buyerId]);
    
    console.log('📬 正在寄送評論通知信給賣家:', seller.email);//測試是否成功寄出

    // ✅ 發信通知賣家
    await sendMail({
      to: seller.email,
      subject: '你收到了新的評論！📩',
      html: `
        <p>親愛的 ${seller.name}，</p>
        <p>你有一筆訂單已被買家 <strong>${buyer.name}</strong> 評論。</p>
        <p>星等：${rating} ⭐</p>
        <p>評論內容：${comment || '(無文字內容)'}</p>
        <p><a href="https://your-frontend.com/seller/reviews">👉 點我查看所有評論</a></p>
        <br>
        <p>感謝你使用我們的二手交易平台 🙌</p>
      `
    });

    res.status(201).json({ message: '評論成功送出，賣家已收到通知' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '評論建立失敗' });
  }
};


// 取得某賣家所有評論（僅顯示未刪除）
exports.getReviewsBySeller = async (req, res) => {
  const sellerId = req.params.sellerId;

  try {
    const [rows] = await db.query(`
      SELECT * FROM reviews
      WHERE seller_id = ? AND is_deleted = FALSE
      ORDER BY created_at DESC
    `, [sellerId]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: '無法取得評論' });
  }
};

// 編輯評論
exports.updateReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;
  const { rating, comment } = req.body;
  const imageUrls = req.files.map(file => `/uploads/reviews/${file.filename}`);

  try {
    const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [reviewId]);
    if (!rows.length) return res.status(404).json({ message: '找不到評論' });

    const review = rows[0];
    if (review.buyer_id !== userId) return res.status(403).json({ message: '無權限修改此評論' });

    await db.query(`
      UPDATE reviews
      SET rating = ?, comment = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [rating, comment, JSON.stringify(imageUrls), reviewId]);

      // 查詢賣家與買家資訊
    const [[seller]] = await db.query('SELECT email, name FROM users WHERE id = ?', [review.seller_id]);
    const [[buyer]] = await db.query('SELECT name FROM users WHERE id = ?', [review.buyer_id]);

    // 發送通知信給賣家
    await sendMail({
      to: seller.email,
      subject: '買家更新了對您的評論 📬',
      html: `
        <p>親愛的 ${seller.name}，</p>
        <p>買家 <strong>${buyer.name}</strong> 已更新對您的評論。</p>
        <p>⭐ 星等：${rating}</p>
        <p>💬 新評論內容：${comment || '(無文字內容)'}</p>
        <p><a href="https://your-frontend.com/seller/reviews">👉 點我查看評論</a></p>
        <br>
        <p>感謝您使用我們的二手交易平台 🙌</p>
      `
    });
    res.json({ message: '評論更新成功' });
  } catch (err) {
    res.status(500).json({ message: '更新評論失敗' });
  }
};

// 賣家回覆評論（並通知買家）
exports.replyToReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;
  const { reply } = req.body;

  try {
    // 查詢評論
    const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [reviewId]);
    if (!rows.length) return res.status(404).json({ message: '找不到評論' });

    const review = rows[0];
    if (review.seller_id !== userId) return res.status(403).json({ message: '無權限回覆此評論' });

    // 更新回覆
    await db.query(`
      UPDATE reviews
      SET reply = ?, reply_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [reply, reviewId]);

    // 查詢買家與賣家資料
    const [[buyer]] = await db.query('SELECT email, name FROM users WHERE id = ?', [review.buyer_id]);
    const [[seller]] = await db.query('SELECT name FROM users WHERE id = ?', [review.seller_id]);

    // 寄信通知買家
    await sendMail({
      to: buyer.email,
      subject: '你的評論已獲得賣家回覆 📨',
      html: `
        <p>親愛的 ${buyer.name} 您好，</p>
        <p>您對賣家 <strong>${seller.name}</strong> 的評論已獲得回覆：</p>
        <blockquote>${reply}</blockquote>
        <p><a href="https://your-frontend.com/user/reviews">👉 點我查看完整評論</a></p>
        <br>
        <p>感謝您使用二手交易平台 🙌</p>
      `
    });

    res.json({ message: '成功回覆評論' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '回覆評論失敗' });
  }
};

// 管理員刪除評論
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;

  // 僅限管理員
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以刪除評論' });
  }

  try {
    // 確認該評論存在
    const [reviewRows] = await db.query('SELECT * FROM reviews WHERE id = ?', [reviewId]);

    if (reviewRows.length === 0) {
      return res.status(404).json({ message: '找不到該評論' });
    }

    // 軟刪除評論
    await db.query('UPDATE reviews SET is_deleted = 1 WHERE id = ?', [reviewId]);

    return res.json({ message: '評論已刪除（軟刪除）' });
  } catch (error) {
    console.error('刪除評論錯誤：', error);
    return res.status(500).json({ message: '伺服器錯誤' });
  }
};