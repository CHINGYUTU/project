const express = require('express');
const admin = express.Router();
const db = require('../DB/db');


//測試用
admin.get('/adminTest', (req, res) =>{
    res.send('this is adminAPI test page')
})

//回傳所有使用者資料
admin.post('/listmember', async (req, res) => {
    const [rows] = await db.query('SELECT ID, Name, Email, Role, Phone FROM Users;');
    res.json(rows);
})

//回傳為驗證房屋資訊
admin.post('/listnotreviewed', async (req, res) => {
    const [rows] = await db.query('SELECT HouseInfo.*, Users.Name , Users.Phone , Users.Email  FROM HouseInfo JOIN Users ON HouseInfo.LandlordID = Users.ID WHERE HouseInfo.Verify = 0;');
    res.send(rows);
})

module.exports = admin;