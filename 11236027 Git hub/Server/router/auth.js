const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../DB/db');
const fs = require('fs');
const path = require('path');
const auth = express.Router();
const { Resend } = require('resend');
const resend = new Resend('re_UKo41Mds_E3WeWEZ2GZkncaBUm18SD453');

const SECRET_KEY = '@J.ox7;b){T)]531zZvR#S4#x7d0RCGcAc)?J;aqH|?L,ueQI,Y3WT38-Y,6y96u';

//登入
auth.post('/login', async (req, res) => {
    if(req.body.Email != "" && req.body.Password != ""){
        const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [req.body.Email]);

        if(rows.length === 0){
            console.log({ success: false, message: 'User not found' });
            res.status(401).send();
            return
        }

        const is = await bcrypt.compare(req.body.Password, rows[0].Password)

        if(is){
            delete rows[0].Password;
            //const token = jwt.sign(rows[0], SECRET_KEY, { expiresIn: '24h' });
            res.status(200).send(rows[0]);
        }else{
            res.status(401).send();
        }
    }else{
        console.log(not);
    }    
}) 

//code 1:Email重複
auth.post('/register', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [req.body.Email]);

        // 檢查電子郵件是否重複
        if (rows.length > 0) {
            return res.status(409).send({ code: 1, message: '此電子郵件已被註冊' }); // 409 為"衝突"的HTTP狀態碼
        }

        // 如果電子郵件不存在，進行註冊流程
        const { Email, Password, UserName, Role, Phone } = req.body;

        // 假設有個 insertUser 函式可以用來新增用戶，這裡需要加密密碼
        const hashedPassword = await bcrypt.hash(Password, 10); // 假設你使用 bcrypt 來加密密碼
        console.log(Role)

        await db.query('INSERT INTO Users (Email, Password, Name, Role, Phone) VALUES (?, ?, ?, ?)', [
            Email, hashedPassword, UserName, Role, Phone
        ]);

        const token = jwt.sign({ userID: rows[0].ID }, SECRET_KEY, { expiresIn: '5m' });
        const filePath = path.join(__dirname, '../templates/verify.html');
        let emailTemplate = fs.readFileSync(filePath, 'utf8');

        // 替换 {{resetLink}} 占位符为实际的重置链接
        emailTemplate = emailTemplate.replace('{{resetLink}}', `https://web.11236027.me/#/verify/${token}`);

        await resend.emails.send({
            from: '隨心租 <admin@11236027.me>',
            to: [Email],
            subject: '帳號驗證',
            html: emailTemplate,
        });

        res.status(201).send({ message: '註冊成功' }); // 201 為創建的HTTP狀態碼

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: '伺服器錯誤，請稍後再試' });
    }
});

auth.post('/verify', async (req, res) => {
    try {
        console.log("11")
        const decoded = jwt.verify(req.body.token, SECRET_KEY);
  
        await db.query('UPDATE Users SET Verify = 1 WHERE ID = ?', [
            decoded.userID
        ]);
  
        res.status(200).send();
    } catch (err) {
        res.status(401).send();
    }
});

auth.post('/sendverifymail', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [req.body.Email]);

    if(rows.length > 0) {
        const token = jwt.sign({ userID: rows[0].ID }, SECRET_KEY, { expiresIn: '5m' });
        const filePath = path.join(__dirname, '../templates/verify.html');
        let emailTemplate = fs.readFileSync(filePath, 'utf8');

        // 替换 {{resetLink}} 占位符为实际的重置链接
        emailTemplate = emailTemplate.replace('{{resetLink}}', `https://web.11236027.me/#/verify/${token}`);
        
        await resend.emails.send({
            from: '隨心租 <admin@11236027.me>',
            to: [req.body.Email],
            subject: '帳號驗證',
            html: emailTemplate,
        });

        res.status(200).send();
    }else{
        res.status(401).send();
    }
});

auth.post('/forgetPwd', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [req.body.Email]);

    if(rows.length > 0) {
        const token = jwt.sign({ userID: rows[0].ID }, SECRET_KEY, { expiresIn: '5m' });
        const filePath = path.join(__dirname, '../templates/resetPassword.html');
        let emailTemplate = fs.readFileSync(filePath, 'utf8');

        // 替换 {{resetLink}} 占位符为实际的重置链接
        emailTemplate = emailTemplate.replace('{{resetLink}}', `https://web.11236027.me/#/respwd/${token}`);
        
        await resend.emails.send({
            from: '隨心租 <admin@11236027.me>',
            to: [req.body.Email],
            subject: '密碼重置',
            html: emailTemplate,
        });

        res.status(200).send();
    }else{
        res.status(401).send();
    }
})

auth.post('/resetPwd', async (req, res) => {
    try {
        
        const decoded = jwt.verify(req.body.token, SECRET_KEY);
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
  
        await db.query('UPDATE Users SET Password = ? WHERE ID = ?', [
            hashedPassword, decoded.userID
        ]);
  
        res.status(200).send();
    } catch (err) {
        res.status(401).send();
    }
});

module.exports = auth;