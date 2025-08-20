// 載入必要套件
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // 

dotenv.config(); // 載入 .env 檔案中的環境變數

// 載入自訂模組
const db = require('./db'); // 連接資料庫路由
const authRoutes = require('./routes/auth'); // 認證相關的路由
const itemRoutes = require('./routes/item'); // 商品路由
const orderRoutes = require('./routes/order'); // 訂單路由
const cartRoutes = require('./routes/cart'); // 購物車路由
const favoriteRoutes = require('./routes/favorite'); // 收藏路由
const categoryRoutes = require('./routes/category');//分類路由
const userRoutes = require('./routes/user'); //  使用者個人資料路由
const viewHistoryRoutes = require('./routes/viewHistory'); // 瀏覽紀錄路由
const logoutRoute = require('./routes/logout');//使用者登出

// 初始化 Express 應用程式
const app = express();

// 使用中介層

app.use(cors()); // 解決 CORS 問題
app.use(express.json()); // 解析 JSON 請求
app.use(express.urlencoded({ extended: true })); // 解析 URL-encoded 格式資料

// 註冊路由
app.use('/api/auth', authRoutes); // 認證
app.use('/api/item', itemRoutes); // 商品
app.use('/api/order', orderRoutes); // 訂單
app.use('/api/cart', cartRoutes); // 購物車
app.use('/api/favorite', favoriteRoutes); // 收藏
app.use('/api/category', categoryRoutes);//分類
app.use('/avatars', express.static(path.join(__dirname, 'uploads', 'avatars')));//靜態圖片存取
app.use('/api/user', userRoutes); // 使用者個人功能（大頭貼、密碼修改等）
app.use('/api/view-history', viewHistoryRoutes);//瀏覽紀錄
app.use('/logout', logoutRoute);//登出
app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, '..', 'public')));


// 測試首頁
app.get('/', (req, res) => {
  res.send('後端伺服器已啟動');
});


// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 伺服器啟動成功：http://localhost:${PORT}`);
});

// 📌 全域錯誤處理機制（放在所有 route 之後）
// 捕捉未定義的 API 路徑
app.use((req, res, next) => {
  res.status(404).json({ message: '找不到此 API 路徑' });
});

// 捕捉伺服器錯誤
app.use((err, req, res, next) => {
  console.error('❌ 全域錯誤:', err);
  res.status(500).json({ message: '伺服器發生錯誤', error: err.message });
});


