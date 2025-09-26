// server.js — 最小可跑版（只開訊息功能）
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

// 中介層/內建
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 路由（只留 message）
const messageRoutes = require('./routes/message');
const messageController = require('./controllers/messageController');
app.use('/api/message', messageRoutes);

// 交給 controller 綁定 socket 事件
if (messageController && typeof messageController.initSocket === 'function') {
  messageController.initSocket(io);
} else {
  console.warn('[warn] messageController.initSocket 不存在，先只開 REST');
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 伺服器啟動成功：http://localhost:${PORT}`);
});

const pointsRoutes = require('./routes/points');
app.use('/api/points', pointsRoutes);


//const pointsRoutes = require('./routes/points');
//app.use('/api/points', pointsRoutes);
