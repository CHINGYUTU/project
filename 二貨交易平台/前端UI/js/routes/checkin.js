const express = require('express');
const router = express.Router();

module.exports = (io, checkinController) => {
  // 前端接口
  router.get('/api/data', (req, res) => checkinController.getData(req, res));
  
  return router;
};