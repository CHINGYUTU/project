const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../DB/db');
const auth = express.Router();

auth.post('/login', async (req, res) => {
    if(req.body.Email != "" && req.body.Password != ""){
        const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [req.body.Email]);

        if(rows.length === 0){
            console.log({ success: false, message: 'User not found' });
            res.status(401).send();
        }

        const is = await bcrypt.compare(req.body.Password, rows[0].Password)

        if(is){
            console.log({ success: true, message: 'login successful' });
            delete rows[0].Password;
            res.status(200).send(rows[0]);
        }else{
            console.log({ success: false, message: 'Incorrect password' });
            res.status(401).send();
        }
    }else{
        console.log(not);
    }    
}) 

module.exports = auth;