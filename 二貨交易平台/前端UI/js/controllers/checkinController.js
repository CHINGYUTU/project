// "資料庫"
const fakeDB = {
  users: [],
  items: [
    { id: 1, name: '初級稱號', price: 50, effect: 'title', value: '萌新' },
    { id: 2, name: '高級稱號', price: 100, effect: 'title', value: '大佬' }
  ],
  achievements: [
    { id: 1, name: '首次簽到', condition: { type: 'totalPoints', threshold: 10 } }
  ]
};

// 等級配置
const LEVEL_CONFIG = {
  DAILY_BASE_POINTS: 10,
  BONUS_MULTIPLIER: [1.0, 1.2, 1.5, 2.0, 2.5, 3.0],
  UPGRADE_REQUIREMENTS: [0, 5, 15, 30, 50, 100]
};

class CheckinController {
  constructor(io) {
    this.io = io;
    this.fakeDB = fakeDB;
    this.LEVEL_CONFIG = LEVEL_CONFIG;
  }

  // 1. 用戶註冊
  handleJoin(socket, username) {
    const user = {
      id: Date.now(),
      socketId: socket.id,
      username,
      points: 0,
      level: 1,
      levelBonus: 1.0,
      purchaseCount: 0,
      lastCheckIn: null,
      inventory: []
    };
    this.fakeDB.users.push(user);
    socket.emit('join-success', { user });
    this.io.emit('update-users', this.fakeDB.users);
  }

  // 2. 每日签到
  handleCheckIn(socket, userId) {
    const user = this.fakeDB.users.find(u => u.id === userId);
    if (!user) return;

    const today = new Date().toDateString();
    if (user.lastCheckIn === today) {
      return socket.emit('check-in-error', '今天已签到过');
    }

    user.points += this.LEVEL_CONFIG.DAILY_BASE_POINTS * user.levelBonus;
    user.lastCheckIn = today;
    socket.emit('check-in-success', { 
      points: user.points,
      nextLevelReq: this.LEVEL_CONFIG.UPGRADE_REQUIREMENTS[user.level] - user.purchaseCount
    });
    this.io.emit('update-users', this.fakeDB.users);
  }

  // 3. 购买商品
  handlePurchase(socket, userId) {
    const user = this.fakeDB.users.find(u => u.id === userId);
    if (!user) return;

    user.purchaseCount++;
    user.points += 5;

    // 升级逻辑
    const nextLevelReq = this.LEVEL_CONFIG.UPGRADE_REQUIREMENTS[user.level];
    if (user.purchaseCount >= nextLevelReq) {
      user.level++;
      user.levelBonus = this.LEVEL_CONFIG.BONUS_MULTIPLIER[user.level];
      socket.emit('level-up', { newLevel: user.level });
    }

    socket.emit('purchase-success', { 
      points: user.points,
      purchaseCount: user.purchaseCount
    });
    this.io.emit('update-users', this.fakeDB.users);
  }

  // 断开连接
  handleDisconnect(socket) {
    this.fakeDB.users = this.fakeDB.users.filter(u => u.socketId !== socket.id);
    this.io.emit('update-users', this.fakeDB.users);
  }

  // 获取数据API
  getData(req, res) {
    res.json({
      users: this.fakeDB.users,
      items: this.fakeDB.items,
      achievements: this.fakeDB.achievements
    });
  }
}

module.exports = CheckinController;