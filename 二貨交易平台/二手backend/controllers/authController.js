const db = require('../db'); // 📦 匯入資料庫連線
const bcrypt = require('bcrypt'); // 🔐 密碼加密用
const jwt = require('jsonwebtoken'); // 🔑 JWT 產生登入憑證
const { sendVerificationEmail, sendResetPasswordEmail } = require('../utils/sendMail'); // 📧 驗證信/重設密碼信
const crypto = require('crypto'); // 🔐 產生驗證用的 token

// 📌 使用者註冊
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // 限制只能用 @ntub.edu.tw 信箱
  if (!email.endsWith('@ntub.edu.tw')) {
    return res.status(400).json({ message: '只能使用 @ntub.edu.tw 信箱註冊' });
  }

  try {
    // 檢查信箱是否已註冊
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: '此信箱已被註冊' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomBytes(32).toString('hex');

    await db.query(
      `INSERT INTO users (name, email, password, role, points, created_at, is_verified, verify_token)
       VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`,
      [name, email, hashedPassword, 'user', 0, 0, verifyToken]
    );

    await sendVerificationEmail(email, verifyToken);
    res.status(200).json({ message: '註冊成功，請至信箱完成驗證' });
  } catch (err) {
    console.error('❌ 註冊錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};


// 📌 信箱驗證
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE verify_token = ?', [token]);
    if (rows.length === 0) {
      return res.status(400).send('驗證連結無效或已過期');
    }

    await db.query(
      'UPDATE users SET is_verified = 1, verify_token = NULL WHERE id = ?',
      [rows[0].id]
    );

    res.send('✅ 驗證成功，請返回系統登入');
  } catch (err) {
    console.error('❌ 驗證錯誤:', err);
    res.status(500).send('伺服器錯誤');
  }
};

// 📌 使用者登入
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: '信箱或密碼錯誤' });
    }

    const user = rows[0];

    if (user.is_verified !== 1) {
      return res.status(401).json({ message: '尚未完成信箱驗證' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '信箱或密碼錯誤' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role }, // role: user 或 admin
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: '登入成功', token });
  } catch (err) {
    console.error('❌ 登入錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};


// 📌 忘記密碼：寄出重設連結
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: '此信箱尚未註冊' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expire = new Date(Date.now() + 3600000); // 1 小時過期

    await db.query(
      'UPDATE users SET reset_token = ?, reset_token_expire = ? WHERE email = ?',
      [token, expire, email]
    );

    await sendResetPasswordEmail(email, token);
    res.json({ message: '重設密碼連結已寄出，請至信箱查收' });
  } catch (err) {
    console.error('❌ 忘記密碼錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 重設密碼：點擊信件後輸入新密碼
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE reset_token = ? AND reset_token_expire > NOW()',
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: '連結無效或已過期' });
    }

    const isSamePassword = await bcrypt.compare(newPassword, rows[0].password);
    if (isSamePassword) {
      return res.status(400).json({ message: '新密碼不得與舊密碼相同' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      `UPDATE users SET password = ?, reset_token = NULL, reset_token_expire = NULL WHERE id = ?`,
      [hashedPassword, rows[0].id]
    );

    res.json({ message: '密碼重設成功，請重新登入' });
  } catch (err) {
    console.error('❌ 重設密碼錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 使用者修改密碼（需登入）
exports.updatePassword = async (req, res) => {
  const userId = req.user.id; // 從 JWT 解出來的 user id
  const { currentPassword, newPassword } = req.body;

  try {
    // 查詢使用者
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到使用者' });
    }

    const user = rows[0];

    // 驗證目前密碼
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '目前密碼錯誤' });
    }

    // 驗證新密碼不得與舊密碼相同
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: '新密碼不得與舊密碼相同' });
    }

    // 加密新密碼並更新
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.json({ message: '密碼更新成功' });
  } catch (err) {
    console.error('❌ 修改密碼錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
