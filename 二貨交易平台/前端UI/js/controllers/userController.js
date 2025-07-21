const db = require('../db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/sendMail');

// 📌 修改個人基本資料（名稱與信箱）
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const name = req.body.name?.trim();
  const email = req.body.email?.trim();

  // ✅ 檢查 email 格式與限定域名
  if (email && !email.endsWith('@ntub.edu.tw')) {
    return res.status(400).json({ message: '只允許使用 @ntub.edu.tw 信箱' });
  }

  try {
    // ✅ 檢查信箱是否被其他人使用
    if (email) {
      const [exists] = await db.query(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, userId]
      );
      if (exists.length > 0) {
        return res.status(409).json({ message: '此信箱已被其他使用者註冊' });
      }
    }

    // ✅ 更新名稱（立即更新）
    if (name) {
      await db.query('UPDATE users SET name = ? WHERE id = ?', [name, userId]);
    }

    // ✅ 如果提供新的 email，建立驗證程序
    if (email) {
      const verifyToken = crypto.randomBytes(32).toString('hex');

      // 寫入 pending_email 並寄送驗證信
      await db.query(
        'UPDATE users SET pending_email = ?, verify_token = ? WHERE id = ?',
        [email, verifyToken, userId]
      );

      await sendVerificationEmail(email, verifyToken);

      return res.json({ message: '名稱已更新。請至新信箱收取驗證信以完成信箱變更。' });
    }

    res.json({ message: '名稱已更新' });
  } catch (err) {
    console.error('❌ 更新個人資料錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};


// 📌 修改密碼
exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: '請提供舊密碼與新密碼' });
  }

  try {
    const [users] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: '找不到使用者' });
    }

    const valid = await bcrypt.compare(oldPassword, users[0].password);
    if (!valid) {
      return res.status(400).json({ message: '舊密碼錯誤' });
    }

    const isSame = await bcrypt.compare(newPassword, users[0].password);
    if (isSame) {
      return res.status(400).json({ message: '新密碼不得與舊密碼相同' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);

    res.json({ message: '密碼修改成功' });
  } catch (err) {
    console.error('❌ 密碼修改錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 上傳大頭貼
exports.updateAvatar = async (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ message: '請提供圖片檔案' });
  }

  const avatarUrl = `/uploads/avatars/${req.file.filename}`;

  try {
    await db.query('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, userId]);
    res.json({ message: '大頭貼更新成功', avatar_url: avatarUrl });
  } catch (err) {
    console.error('❌ 上傳大頭貼錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};
