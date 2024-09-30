const express = require('express');
const admin = express.Router();
const db = require('../DB/db');

admin.get('/adminTest', (req, res) =>{
    res.send('this is adminAPI test page')
})

admin.post('/listmember', async (req, res) => {
    const [rows] = await db.query('SELECT ID, Name, Email, Role, Phone FROM Users;');
    res.json(rows);
})

admin.post('/listnotreviewed', async (req, res) => {
    const [rows] = await db.query('SELECT HouseInfo.*, Users.Name AS Name, Users.Phone as Phone, Users.Email as Email FROM HouseInfo JOIN Users ON HouseInfo.ID = Users.ID WHERE Verify = 0;');
    res.json(rows);
})

module.exports = admin;