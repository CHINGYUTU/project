const express = require('express');
const router = express.Router();
const db = require('../DB/db');

//回傳所有已驗證房屋簡要資訊
router.post('/getAllHouseInfo', async (req, res) => {
    const [rows] = await db.query('SELECT ID, Address, Price, MainPic, Area, Title, Pattern, Size FROM HouseInfo WHERE Verify = 1');
    res.status(200).send(rows);
})

//回傳個別已驗證房屋詳細資訊
router.post('/getSpecifyHouseInfo', async (req, res) => {
    const [rows] = await db.query('SELECT HouseInfo.*, Equipment.*, Users.Name, Users.Email, YEAR(Users.JoinTime) AS JoinYear, Users.Phone, Users.Headshot FROM HouseInfo INNER JOIN Equipment ON HouseInfo.EquipmentID = Equipment.ID INNER JOIN Users ON HouseInfo.LandlordID = Users.ID WHERE HouseInfo.ID = ?', [req.body.ID]);
    console.log(req.body.ID);
    if(rows.length > 0) {
        res.status(200).send(rows[0]);
    }else{
        res.status(404).send();
    }
    
})

module.exports = router;