const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 寄驗證信（註冊 or 更換信箱）
const sendVerificationEmail = async (to, token) => {
  const verifyLink = `http://localhost:3000/api/auth/verify?token=${token}`;

  const mailOptions = {
    from: `"NTUB 二手平台" <${process.env.EMAIL_USER}>`,
    to,
    subject: '📧 信箱驗證 - NTUB 二手交易平台',
    text: `請點擊以下連結完成信箱驗證：\n${verifyLink}`,
    html: `
      <h2>📧 請驗證您的信箱</h2>
      <p>您好，請點擊以下連結以驗證您的信箱：</p>
      <a href="${verifyLink}">${verifyLink}</a>
      <p style="color: gray;">若您最近有變更註冊信箱，請務必點擊以上連結以完成驗證。</p>
      <p>如果這不是您本人操作，請忽略此信。</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ 驗證信已寄出');
  } catch (error) {
    console.error('❌ 寄送驗證信失敗:', error);
  }
};


const sendResetPasswordEmail = async (to, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: `"NTUB 二手平台" <${process.env.EMAIL_USER}>`,
    to,
    subject: '🔐 密碼重設 - NTUB 二手交易平台',
    text: `請點擊以下連結以重設密碼：\n${resetLink}\n\n連結將在 1 小時後失效。`,
    html: `
      <h2>🔐 重設您的密碼</h2>
      <p>請點擊下方連結以設定新密碼（連結有效時間為 1 小時）：</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>若您未曾請求重設密碼，請忽略此封郵件。</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ 密碼重置信寄出');
  } catch (error) {
    console.error('❌ 寄送密碼重置信失敗:', error);
  }
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail
};
