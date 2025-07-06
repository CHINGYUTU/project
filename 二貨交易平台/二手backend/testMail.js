// 匯入必要套件
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// 載入 .env 檔案
dotenv.config();

// 🔍 測試是否成功讀取環境變數
console.log('🔍 EMAIL_USER:', process.env.EMAIL_USER);
console.log('🔍 EMAIL_PASS:', process.env.EMAIL_PASS ? '已讀取' : '❌ 未讀取');

// 若環境變數未正確載入，顯示錯誤並停止
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ 無法讀取 .env 中的 EMAIL_USER 或 EMAIL_PASS。請確認格式正確且無空格。');
  process.exit(1);
}

// 建立寄信 transporter（使用 Gmail）
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 設定寄信內容
const mailOptions = {
  from: `"NTUB 二手平台" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER, // 測試時寄給自己
  subject: '📧 測試信件 - NTUB 二手交易平台',
  text: '這是一封測試信件，代表你成功設定 Gmail 應用程式密碼與環境變數。',
};

// 寄送信件
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('❌ 信件寄送失敗:', error);
  }
  console.log('✅ 信件已成功寄出：', info.response);
});