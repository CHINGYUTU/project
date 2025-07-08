const db = require('../db');
const bcrypt = require('bcrypt');

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

  // ✅ 先確認是否有上傳圖片
  if (!req.file) {
    return res.status(400).json({ message: '請提供圖片檔案' });
  }

  // ✅ 定義圖片路徑
  const avatarUrl = `/uploads/avatars/${req.file.filename}`;

  try {
    await db.query('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, userId]);
    res.json({ message: '大頭貼更新成功', avatar_url: avatarUrl });
  } catch (err) {
    console.error('❌ 上傳大頭貼錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};
