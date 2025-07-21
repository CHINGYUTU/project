const multer = require('multer');
const path = require('path');

// 🟦 共用儲存函數（接收目錄名稱）
const createStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('僅支援 JPEG/PNG/WEBP 格式圖片'), false);
  }
};

// 🟧 匯出兩個上傳工具
exports.uploadItemImage = multer({ storage: createStorage('items'), fileFilter });
exports.uploadAvatar = multer({ storage: createStorage('avatars'), fileFilter });
