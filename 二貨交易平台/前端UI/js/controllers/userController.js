const db = require('../db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/sendMail');

// 📌 取得個人資料（供前端預設值用）
exports.getProfile = async (req, res) => {
  console.log('getProfile req.user:', req.user);
  console.log("📥 getProfile 進來了");
  console.log("🔍 req.headers.authorization:", req.headers.authorization);
  console.log("🔍 req.user:", req.user);

  if (!req.user) {
    return res.status(401).json({ message: 'Token 驗證失敗，請重新登入' });
  }
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      'SELECT name, email, avatar_url FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: '找不到使用者' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('❌ 取得個人資料錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
// 📌 修改個人基本資料（名稱與信箱）
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const name = req.body.name?.trim();
  const email = req.body.email?.trim();
  const oldPassword = req.body.oldPassword; // ✅ 從前端取得舊密碼

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

    // ✅ 更新名稱（不需要密碼）
    if (name) {
      await db.query('UPDATE users SET name = ? WHERE id = ?', [name, userId]);
    }

    // ✅ 更新信箱（需要密碼驗證）
    if (email) {
      // 🔐 從資料庫撈密碼
      const [users] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
      if (users.length === 0) {
        return res.status(404).json({ message: '找不到使用者' });
      }

      // 🔐 檢查 oldPassword
      const valid = await bcrypt.compare(oldPassword || '', users[0].password);
      if (!valid) {
        return res.status(400).json({ message: '舊密碼錯誤，無法修改信箱' });
      }

      // ✅ 密碼正確才會進行信箱變更流程
      const verifyToken = crypto.randomBytes(32).toString('hex');

      await db.query(
        'UPDATE users SET pending_email = ?, verify_token = ? WHERE id = ?',
        [email, verifyToken, userId]
      );

      await sendVerificationEmail(email, verifyToken);

      return res.json({ message: '名稱已更新。請至新信箱收取驗證信以完成信箱變更。' });
    }

    // ✅ 只有名稱更新
    res.json({ message: '名稱已更新' });
  } catch (err) {
    console.error('❌ 更新個人資料錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 驗證舊密碼
exports.verifyPassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword } = req.body;

  if (!oldPassword) {
    return res.status(400).json({ message: '請提供舊密碼' });
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

    res.json({ message: '舊密碼驗證成功' });
  } catch (err) {
    console.error('❌ 驗證密碼錯誤:', err);
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
