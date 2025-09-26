// controllers/messageController.js
const db = require('../db');
let ioRef = null;

exports.getMessagesWithUser = async (req, res) => {
  try {
    const me = req.user?.id ?? 2;
    const other = Number(req.query.otherUserId || req.params.otherUserId);
    const itemId = req.query.item_id ? Number(req.query.item_id) : null;

    const [rows] = await db.query(
      `SELECT id, sender_id, receiver_id, item_id, order_id, content, image_url, created_at, read_at
         FROM messages
        WHERE ((sender_id=? AND receiver_id=?) OR (sender_id=? AND receiver_id=?))
          AND (? IS NULL OR item_id=?)
        ORDER BY id ASC
        LIMIT 500`,
      [me, other, other, me, itemId, itemId]
    );
    res.json({ messages: rows });
  } catch (e) { console.error(e); res.status(500).json({ message: 'getMessagesWithUser failed' }); }
};

exports.sendMessage = async (req, res) => {
  try {
    const me = req.user?.id ?? 2;
    const receiver_id = Number(req.body.receiver_id);
    const item_id  = req.body.item_id ? Number(req.body.item_id) : null;
    const order_id = req.body.order_id ? Number(req.body.order_id) : null;
    const content  = (req.body.content ?? '').trim() || null;
    const image_url = req.file ? `/uploads/messages/${req.file.filename}` : null;
    if (!content && !image_url) return res.status(400).json({ message: 'content 或 image 至少一個' });

    const [ret] = await db.query(
      `INSERT INTO messages (sender_id, receiver_id, item_id, order_id, content, image_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [me, receiver_id, item_id, order_id, content, image_url]
    );
    const [[row]] = await db.query('SELECT * FROM messages WHERE id=?', [ret.insertId]);

    if (ioRef) ioRef.to(`u:${row.receiver_id}`).emit('receiveMessage', row);
    res.json({ message: 'OK', data: row });
  } catch (e) { console.error(e); res.status(500).json({ message: 'sendMessage failed' }); }
};

exports.markAsRead = async (req, res) => {
  try {
    const me = req.user?.id ?? 2;
    const other = Number(req.body.otherUserId);
    const itemId = req.body.item_id ? Number(req.body.item_id) : null;
    const [ret] = await db.query(
      `UPDATE messages
          SET read_at = NOW()
        WHERE receiver_id=? AND sender_id=? AND ( ? IS NULL OR item_id=? )
          AND read_at IS NULL`,
      [me, other, itemId, itemId]
    );
    res.json({ updated: ret.affectedRows || 0 });
  } catch (e) { console.error(e); res.status(500).json({ message: 'markAsRead failed' }); }
};

exports.initSocket = (io) => {
  ioRef = io;
  io.on('connection', (socket) => {
    socket.on('join', (userId) => socket.join(`u:${userId}`));
    socket.on('typing',     (p) => socket.to(`u:${p.to}`).emit('typing', p));
    socket.on('stopTyping', (p) => socket.to(`u:${p.to}`).emit('stopTyping', p));
  });
};
