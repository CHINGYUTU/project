const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 用來檢查與建立資料夾

// 🟦 共用儲存函數：依照 folder 參數設定對應的存放位置
const createStorage = (folder) => {
  // 確保 uploads/<folder> 資料夾存在，若無則建立
  const fullPath = `uploads/${folder}`;
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fullPath); // 儲存到 uploads/<folder>/ 中
    },
    filename: (req, file, cb) => {
      // 建立唯一檔名：時間戳+隨機數+原始副檔名
      const ext = path.extname(file.originalname);
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
      cb(null, uniqueName);
    }
  });
};

// 🟨 圖片檔案類型過濾器：只允許 jpeg / png / webp
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // 通過驗證
  } else {
    cb(new Error('僅支援 JPEG / PNG / WEBP 格式圖片'), false);
  }
};

// 🟧 匯出兩組圖片上傳工具
exports.uploadItemImage = multer({
  storage: createStorage('items'),   // 商品圖片儲存在 uploads/items/
  fileFilter
});

exports.uploadAvatar = multer({
  storage: createStorage('avatars'), // 大頭貼儲存在 uploads/avatars/
  fileFilter
});
