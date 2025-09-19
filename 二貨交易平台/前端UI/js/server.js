// 載入必要套件
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');// 改用 http.Server 以支援 Socket.IO
const { Server } = require('socket.io');

dotenv.config();// 載入 .env 檔案中的環境變數

// 載入自訂模組
const db = require('./db');// 連接資料庫路由
const authRoutes = require('./routes/auth');// 認證相關的路由
const itemRoutes = require('./routes/item');// 商品路由
const orderRoutes = require('./routes/order');// 訂單路由
const cartRoutes = require('./routes/cart');// 購物車路由
const favoriteRoutes = require('./routes/favorite');// 收藏路由
const categoryRoutes = require('./routes/category');// 分類路由
const userRoutes = require('./routes/user');// 使用者個人資料路由
const viewHistoryRoutes = require('./routes/viewHistory');// 瀏覽紀錄路由
const logoutRoute = require('./routes/logout');// 使用者登出
const messageRoutes = require('./routes/message'); // 聊天訊息路由
const messageController = require('./controllers/messageController');

// 初始化 Express 應用程式
const app = express();

const server = http.createServer(app); // 用 http server 取代 app.listen
const io = new Server(server, {
  cors: {
    origin: '*', // 如果要限制，可以改成前端網址
    methods: ['GET', 'POST']
  }
});

// 使用中介層
app.use(cors());// 解決 CORS 問題
app.use(express.json());// 解析 JSON 請求
app.use(express.urlencoded({ extended: true })); // 解析 URL-encoded 格式資料

// 註冊路由
app.use('/api/auth', authRoutes);// 認證
app.use('/api/item', itemRoutes);// 商品
app.use('/api/order', orderRoutes);// 訂單
app.use('/api/cart', cartRoutes);// 購物車
app.use('/api/favorite', favoriteRoutes);// 收藏
app.use('/api/category', categoryRoutes);// 分類
app.use('/avatars', express.static(path.join(__dirname, 'uploads', 'avatars')));// 靜態圖片存取
app.use('/api/user', userRoutes);// 使用者個人功能（大頭貼、密碼修改等）
app.use('/api/view-history', viewHistoryRoutes); // 瀏覽紀錄
app.use('/logout', logoutRoute);// 商品圖片靜態檔案
app.use('/api/message', messageRoutes); // 聊天訊息 API

app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// 初始化 socket.io
messageController.initSocket(io); // ⬅️ 讓訊息控制器接管 WebSocket 連線

// 啟動伺服器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 伺服器啟動成功：http://localhost:${PORT}`);
});

// 錯誤處理
app.use((req, res, next) => {
  res.status(404).json({ message: '找不到此 API 路徑' });
});
app.use((err, req, res, next) => {
  console.error('❌ 全域錯誤:', err);
  res.status(500).json({ message: '伺服器發生錯誤', error: err.message });
});
