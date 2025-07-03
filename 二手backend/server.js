// 載入必要套件
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 載入自訂模組
const db = require('./db'); // 連接資料庫
const authRoutes = require('./routes/auth'); // 認證相關的路由
const itemRoutes = require('./routes/item'); // 匯入 item 的路由設定
const orderRoutes = require('./routes/order');// 匯入 order 的路由設定
// 初始化 Express 應用程式
const app = express();
dotenv.config(); // 載入 .env 檔案中的環境變數

// 使用中介層（middleware）
app.use(cors()); // 開啟跨來源請求支援（可避免 CORS 問題）
app.use(express.json()); // 解析 JSON 格式的 request body
app.use(express.urlencoded({ extended: true })); // 解析 URL-encoded 格式資料

// 註冊路由
app.use('/api/auth', authRoutes); // 所有 /api/auth 開頭的路由都由 authRoutes 處理

//負責商品的 API
app.use('/api/item', itemRoutes);// 將所有 /api/item 開頭的路由，交給 itemRoutes 處理
app.use('/api/order', orderRoutes); // 掛載訂單路由

// 測試首頁
app.get('/', (req, res) => {
  res.send('後端伺服器已啟動');
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器啟動成功：http://localhost:${PORT}`);
});
