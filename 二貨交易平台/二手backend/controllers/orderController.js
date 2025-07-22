const db = require('../db');
const { sendMail } = require('../utils/sendMail');

// 📌 查詢個人訂單
exports.getMyOrders = async (req, res) => {
  const userId = req.user.id;

  if (req.user.role === 'admin') {
    return res.status(403).json({ message: '管理員無法查詢個人訂單' });
  }

  try {
    const [rows] = await db.query(
      `SELECT o.*, 
          GROUP_CONCAT(LEFT(oi.item_name, 50) SEPARATOR ', ') AS item_names,
          GROUP_CONCAT(DISTINCT LEFT(oi.location, 100) SEPARATOR ', ') AS locations,
          GROUP_CONCAT(oi.price SEPARATOR ', ') AS item_prices
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       WHERE o.buyer_id = ? OR o.seller_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId, userId]
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 管理員查詢所有訂單
exports.getAllOrders = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '只有管理員可以查看所有訂單' });
  }

  try {
    const [rows] = await db.query(
      `SELECT o.*, 
          u.email AS buyer_email,
          s.email AS seller_email,
          GROUP_CONCAT(LEFT(oi.item_name, 50) SEPARATOR ', ') AS item_names,
          GROUP_CONCAT(DISTINCT LEFT(oi.location, 100) SEPARATOR ', ') AS locations,
          GROUP_CONCAT(oi.price SEPARATOR ', ') AS item_prices
       FROM orders o
       JOIN users u ON o.buyer_id = u.id
       JOIN users s ON o.seller_id = s.id
       JOIN order_items oi ON o.id = oi.order_id
       GROUP BY o.id
       ORDER BY o.created_at DESC`
    );
    res.json({ message: '查詢成功', data: rows });
  } catch (err) {
    console.error('❌ 查詢所有訂單錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};

// 📌 更新訂單狀態
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;
  const userId = req.user.id;

  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  if (!validStatuses.includes(orderStatus)) {
    return res.status(400).json({ message: '不合法的訂單狀態' });
  }

  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (orders.length === 0) {
      return res.status(404).json({ message: '找不到該訂單' });
    }

    const order = orders[0];
    if (order.buyer_id !== userId && order.seller_id !== userId) {
      return res.status(403).json({ message: '無權限更新此訂單' });
    }

    if (orderStatus === 'confirmed' && userId !== order.seller_id) {
      return res.status(403).json({ message: '只有賣家可以確認訂單' });
    }

    if (orderStatus === 'completed' && userId !== order.buyer_id) {
      return res.status(403).json({ message: '只有買家可以完成訂單' });
    }

    // ✅ 更新訂單狀態
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [orderStatus, orderId]);

    // ✅ 同步更新商品狀態
    if (orderStatus === 'completed') {
      await db.query(`
        UPDATE items 
        SET status = 'sold' 
        WHERE id IN (SELECT item_id FROM order_items WHERE order_id = ?)`, 
        [orderId]
      );

      // ✅ 查詢買家資訊
      const [buyerRows] = await db.query(`
        SELECT u.email, u.name 
        FROM orders o
        JOIN users u ON o.buyer_id = u.id
        WHERE o.id = ?
      `, [orderId]);

      const buyer = buyerRows[0];

      // ✅ 寄送評論提醒信
      await sendMail({
        to: buyer.email,
        subject: '訂單完成，留下你的評論吧！⭐',
        html: `
          <p>親愛的 ${buyer.name}，</p>
          <p>你已完成訂單（編號 #${orderId}），歡迎你撰寫評論，幫助其他買家了解這位賣家。</p>
          <p><a href="https://your-frontend.com/review/${orderId}">👉 點我留下評論</a></p>
          <br><p>感謝你使用二手平台</p>
        `
      });

    } else if (orderStatus === 'cancelled') {
      await db.query(`
        UPDATE items 
        SET status = 'available' 
        WHERE id IN (SELECT item_id FROM order_items WHERE order_id = ?)`,
        [orderId]
      );
    }

    res.json({ message: `訂單狀態已更新為 ${orderStatus}` });

  } catch (err) {
    console.error('❌ 更新訂單狀態錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};

// 📌 查詢單筆訂單詳情
exports.getOrderDetail = async (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.user.id;
  const role = req.user.role;

  try {
    // 查詢訂單主資訊
    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);

    if (orders.length === 0) {
      return res.status(404).json({ message: '找不到該訂單' });
    }

    const order = orders[0];

    // 僅限該訂單的買家、賣家或管理員查看
    if (role !== 'admin' && userId !== order.buyer_id && userId !== order.seller_id) {
      return res.status(403).json({ message: '無權限查看此訂單' });
    }

    // 查詢訂單包含的商品
    const [items] = await db.query(
      `SELECT item_name, price, location
      FROM order_items
      WHERE order_id = ?`,
      [orderId]
    );

    res.json({
      message: '查詢成功',
      data: {
        order,
        items
      }
    });
  } catch (err) {
    console.error('❌ 查詢訂單詳情錯誤:', err);
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
};
