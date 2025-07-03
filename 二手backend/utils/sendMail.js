const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 寄驗證信
const sendVerificationEmail = async (to, token) => {
  const verifyLink = `http://localhost:3000/api/auth/verify?token=${token}`;

  const mailOptions = {
    from: `"NTUB 二手平台" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: '📧 信箱驗證 - NTUB 二手交易平台',
    text: `請點擊以下連結完成驗證：\n\n${verifyLink}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ 驗證信已寄出');
  } catch (error) {
    console.error('❌ 寄送驗證信失敗:', error);
  }
};

// 寄送重設密碼信件
const sendResetPasswordEmail = async (to, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: `"NTUB 二手平台" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: '🔐 密碼重設 - NTUB 二手交易平台',
    text: `請點擊以下連結以重設密碼：\n\n${resetLink}\n\n連結將在 1 小時後失效。`
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
