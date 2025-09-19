const db = require('../db');
const path = require('path');

// 📌 送出訊息（REST API）
exports.sendMessage = async (req, res) => {
  const { receiver_id, item_id, order_id, content } = req.body;
  const sender_id = req.user.id;
  const image_url = req.file ? `/uploads/messages/${req.file.filename}` : null;

  if (!receiver_id || (!content && !image_url)) {
    return res.status(400).json({ message: "receiver_id 和 content / image 至少要有一個" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO messages (sender_id, receiver_id, item_id, order_id, content, image_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [sender_id, receiver_id, item_id || null, order_id || null, content || null, image_url]
    );

    res.status(201).json({
      message: "訊息已送出",
      data: { 
        id: result.insertId, 
        sender_id, 
        receiver_id, 
        content, 
        image_url, 
        item_id, 
        order_id 
      }
    });
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};

// 📌 取得和某使用者的聊天紀錄
exports.getMessagesWithUser = async (req, res) => {
  const userId = req.user.id;
  const { otherUserId, item_id, order_id } = req.query;

  if (!otherUserId) {
    return res.status(400).json({ message: "請提供 otherUserId" });
  }

  try {
    let sql = `SELECT * FROM messages 
               WHERE ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?))`;
    let params = [userId, otherUserId, otherUserId, userId];

    if (item_id) {
      sql += " AND item_id = ?";
      params.push(item_id);
    }
    if (order_id) {
      sql += " AND order_id = ?";
      params.push(order_id);
    }

    sql += " ORDER BY created_at ASC";

    const [rows] = await db.query(sql, params);

    res.status(200).json({ messages: rows });
  } catch (error) {
    console.error("getMessagesWithUser error:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};

// 📌 將某對話標記為已讀
exports.markAsRead = async (req, res) => {
  const userId = req.user.id;
  const { otherUserId, item_id, order_id } = req.body;

  try {
    let sql = `UPDATE messages 
               SET is_read = TRUE 
               WHERE receiver_id = ? AND sender_id = ?`;
    let params = [userId, otherUserId];

    if (item_id) {
      sql += " AND item_id = ?";
      params.push(item_id);
    }
    if (order_id) {
      sql += " AND order_id = ?";
      params.push(order_id);
    }

    await db.query(sql, params);

    res.status(200).json({ message: "訊息已標記為已讀" });
  } catch (error) {
    console.error("markAsRead error:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};

// 📌 初始化 Socket.IO
exports.initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 使用者已連線', socket.id);

    // 加入房間（userId 讓雙方有各自房間）
    socket.on('join', (userId) => {
      socket.join(`user_${userId}`);
      console.log(`👤 使用者 ${userId} 加入房間 user_${userId}`);
    });

    // 接收訊息並廣播
    socket.on('sendMessage', async (msgData) => {
      try {
        const { sender_id, receiver_id, item_id, order_id, content, image_url } = msgData;

        if (!receiver_id || (!content && !image_url)) {
          return;
        }

        const [result] = await db.query(
          `INSERT INTO messages (sender_id, receiver_id, item_id, order_id, content, image_url) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [sender_id, receiver_id, item_id || null, order_id || null, content || null, image_url || null]
        );

        const newMessage = { 
          id: result.insertId, 
          sender_id, 
          receiver_id, 
          item_id, 
          order_id, 
          content, 
          image_url 
        };

        // 傳給接收者房間
        io.to(`user_${receiver_id}`).emit('receiveMessage', newMessage);
        // 也傳給自己，確保自己 UI 立即更新
        io.to(`user_${sender_id}`).emit('receiveMessage', newMessage);

      } catch (err) {
        console.error('❌ Socket 傳送訊息錯誤', err);
        socket.emit('errorMessage', { message: '訊息傳送失敗' });
      }
    });

    socket.on('disconnect', () => {
      console.log('🔌 使用者斷線', socket.id);
    });
  });
};
