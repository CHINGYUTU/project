// controllers/pointsController.js
const pool = require('../db'); // 你的 db.js 要 export mysql2/promise pool

// demo 兌換品（也可以做成資料表，這裡先硬編）：
const REWARDS = [
  { key: 'coffee-30', title: '咖啡折扣券', cost: 30, desc: '折抵 50' },
  { key: 'market-80', title: '超商購物金', cost: 80, desc: 'NT$100' },
];

async function ensureUserRow(conn, userId) {
  await conn.query(
    'INSERT INTO user_points (user_id, points) VALUES (?, 0) ON DUPLICATE KEY UPDATE user_id = user_id',
    [userId]
  );
}

exports.getBalance = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.query(
      'SELECT points, updated_at FROM user_points WHERE user_id = ?',
      [userId]
    );
    if (!rows.length) {
      // 第一次查不到就建一筆
      await pool.query('INSERT INTO user_points (user_id, points) VALUES (?, 0)', [userId]);
      return res.json({ points: 0, updated_at: null });
    }
    return res.json({ points: rows[0].points, updated_at: rows[0].updated_at });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'getBalance failed' });
  }
};

exports.listRewards = async (_req, res) => {
  return res.json({ rewards: REWARDS });
};

// 完成交易 +10 點
exports.earnTrade = async (req, res) => {
  const userId = req.user.id;
  const itemId = Number(req.body?.item_id ?? null);
  const delta = 10;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await ensureUserRow(conn, userId);

    // 鎖住當前點數
    await conn.query('SELECT points FROM user_points WHERE user_id = ? FOR UPDATE', [userId]);

    await conn.query(
      `INSERT INTO point_ledger (user_id, delta, reason, ref_item_id, ref_order_id, created_at)
       VALUES (?, ?, 'complete_trade', ?, NULL, NOW())`,
      [userId, delta, itemId || null]
    );

    await conn.query(
      'UPDATE user_points SET points = points + ?, updated_at = NOW() WHERE user_id = ?',
      [delta, userId]
    );

    const [b] = await conn.query('SELECT points FROM user_points WHERE user_id = ?', [userId]);
    await conn.commit();
    return res.json({ ok: true, delta, points: b[0].points });
  } catch (e) {
    await conn.rollback();
    console.error(e);
    return res.status(500).json({ error: 'earnTrade failed' });
  } finally {
    conn.release();
  }
};

// 兌換商品（扣點）
exports.redeem = async (req, res) => {
  const userId = req.user.id;
  const rewardKey = String(req.body?.reward_key || '');
  const reward = REWARDS.find(r => r.key === rewardKey);
  if (!reward) return res.status(400).json({ error: 'unknown reward_key' });

  const cost = reward.cost;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await ensureUserRow(conn, userId);

    const [[row]] = await conn.query(
      'SELECT points FROM user_points WHERE user_id = ? FOR UPDATE',
      [userId]
    );

    if ((row?.points ?? 0) < cost) {
      await conn.rollback();
      return res.status(400).json({ error: 'points not enough' });
    }

    await conn.query(
      `INSERT INTO point_ledger (user_id, delta, reason, ref_item_id, ref_order_id, created_at)
       VALUES (?, ?, 'redeem', NULL, NULL, NOW())`,
      [userId, -cost]
    );

    await conn.query(
      'UPDATE user_points SET points = points - ?, updated_at = NOW() WHERE user_id = ?',
      [cost, userId]
    );

    const [[after]] = await conn.query('SELECT points FROM user_points WHERE user_id = ?', [userId]);
    await conn.commit();
    return res.json({ ok: true, reward: rewardKey, points: after.points });
  } catch (e) {
    await conn.rollback();
    console.error(e);
    return res.status(500).json({ error: 'redeem failed' });
  } finally {
    conn.release();
  }
};
