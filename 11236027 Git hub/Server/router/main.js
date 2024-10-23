
const { Resend } = require('resend');
const express = require('express');
const router = express.Router();
const db = require('../DB/db');
const resend = new Resend('re_UKo41Mds_E3WeWEZ2GZkncaBUm18SD453');


//回傳所有已驗證房屋簡要資訊
router.post('/getAllHouseInfo', async (req, res) => {
    const [rows] = await db.query('SELECT ID, City, Address, Price, MainPic, Area, Title, Pattern, Size, Rent, ReleaseTime FROM HouseInfo WHERE Verify = 1');
    res.status(200).send(rows);
})

//回傳個別已驗證房屋詳細資訊
router.post('/getSpecifyHouseInfo', async (req, res) => {
    const [rows] = await db.query('SELECT HouseInfo.*, Equipment.*, Image.*, Users.Name, Users.Email, YEAR(Users.JoinTime) AS JoinYear, Users.Phone, Users.Headshot FROM HouseInfo INNER JOIN Equipment ON HouseInfo.EquipmentID = Equipment.ID INNER JOIN Users ON HouseInfo.LandlordID = Users.ID LEFT JOIN Image ON Image.ID = HouseInfo.ImageID WHERE HouseInfo.ID = ?', [req.body.ID]);
    if(rows.length > 0) {
        res.status(200).send(rows[0]);
    }else{
        res.status(404).send();
    }
})

//回傳房東已上傳之房屋
router.post('/getPosted', async (req, res) => {
    const [rows] = await db.query('SELECT * from HouseInfo WHERE HouseInfo.LandlordID = ?', [req.body.ID]);
    if(rows.length > 0) {
        res.status(200).send(rows);
    }else{
        res.status(404).send();
    }
    
})

router.post('/changeRent', async (req, res) => {
    const [rows] = await db.query('UPDATE HouseInfo SET HouseInfo.Rent = ? WHERE HouseInfo.ID = ?',[req.body.Rent, req.body.ID]);
    if (rows.affectedRows > 0) {
        res.status(200).send({ message: 'Rent updated successfully.' });
    } else {
        res.status(404).send({ message: 'House not found.' });
    }
    
})

router.post('/mailTest', async (req, res) => {
    
    try{
        await resend.emails.send({
            from: '隨心租 <admin@11236027.me>',
            to: ['s0903072534@gmail.com'],
            subject: '操',
            html: '<p>it works!</p>',
        });
        res.status(200).send();
    }catch(err){
        res.status(404).send();
    }
    
})

router.post('/checklike', async (req, res) => {
    try {
        // 修正 HouseID 的拼寫錯誤
        const [rows] = await db.query('SELECT * FROM Favorites WHERE UserID = ? AND HouseID = ?', [req.body.UserID, req.body.HouseID]);
        
        // 如果找到匹配的記錄，則返回相應的狀態
        if (rows.length > 0) {
            res.status(200).send({ liked: true });
        } else {
            res.status(200).send({ liked: false });
        }
    } catch (error) {
        // 捕捉異常並返回錯誤狀態
        res.status(500).send({ error: 'Server error' });
    }
});

router.post('/like', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM Favorites WHERE UserID = ? AND HouseID = ?', [req.body.UserID, req.body.HouseID]);
    try{
        if(rows.length === 0) {
            await db.query('INSERT INTO Favorites (UserID, HouseID) VALUES (?, ?)', [req.body.UserID, req.body.HouseID]);
            res.status(200).send();
        }
    }catch(err){
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
})

router.post('/cancelLike', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM Favorites WHERE UserID = ? AND HouseID = ?', [req.body.UserID, req.body.HouseID]);

    if (rows.length > 0) {
        // 如果有記錄，刪除該喜歡
        await db.query('DELETE FROM Favorites WHERE UserID = ? AND HouseID = ?', [req.body.UserID, req.body.HouseID]);
        return res.status(200).send({ message: 'Unliked' });
    } else {
        return res.status(400).send({ message: 'Not liked yet' });
    }
})

router.post('/getFavorites', async (req, res) => {
    

    try {
        const [rows] = await db.query('SELECT * FROM Favorites WHERE UserID = ?', [req.body.UserID]);
        const ids = rows.map(item => item.HouseID);

        // 檢查是否提供了 ID 列表
        let query = 'SELECT ID, City, Address, Price, MainPic, Area, Title, Pattern, Size, Rent FROM HouseInfo WHERE Verify = 1';
        let params = [];

        if (ids && ids.length > 0) {
            // 如果有提供 ID 列表，使用 IN 子句進行過濾
            query += ' AND ID IN (?)';
            params.push(ids); // 將 ID 列表作為參數傳入
        }

        const [d] = await db.query(query, params);

        res.status(200).send(d);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
})

router.post('/post', async (req, res) => {
    const { id, city, area, address, title, price, pattern, size, floor, introduction, managementFee, rentalInstructions, imageURL, selectedFacilities, deposit  } = req.body;
    const mainPic = req.body.imageURL[0];
    imageURL.shift();
    let imageID = null;

    const [result] = await db.query('INSERT INTO Equipment (Refrigerator, WashingMachine, TV, AirConditioner, WaterHeater, Bed, Wardrobe, Channel4, Network, NaturalGas, Sofa, Tables, Balcony, Elevator, ParkingSpace) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        selectedFacilities.Refrigerator, selectedFacilities.WashingMachine, selectedFacilities.TV, selectedFacilities.AirConditioner, selectedFacilities.WaterHeater, selectedFacilities.Bed, selectedFacilities.Wardrobe, selectedFacilities.Wardrobe,
        selectedFacilities.Channel4, selectedFacilities.Network, selectedFacilities.NaturalGas, selectedFacilities.Sofa, selectedFacilities.Tables, selectedFacilities.Balcony, selectedFacilities.Elevator, selectedFacilities.ParkingSpace
    ]);
    const equipmentID = result.insertId

    while (imageURL.length < 8) {
        imageURL.push(null);  // Fill remaining slots with `null`
    }

    if(imageURL){
        let [result1] = await db.query('INSERT INTO Image (Pic1, Pic2, Pic3, Pic4, Pic5, Pic6, Pic7, Pic8) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', imageURL);
        imageID = result1.insertId
    }
     
    console.log(imageID, equipmentID)
    

    await db.query('INSERT INTO HouseInfo (ImageID, LandlordID, EquipmentID, Title, City, Area, Address, Price, Pattern, Size, MainPic, Floor, Deposit, Introduction, ManagementFee, RentalInstructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        imageID, id, equipmentID, title, city, area, address, price, pattern, size, mainPic, floor,deposit, introduction, managementFee, rentalInstructions
    ]);

    res.status(200).send();
})


router.post('/delpost', async (req, res) => {
    await db.query('DELETE FROM HouseInfo WHERE ID = ?', [req.body.ID])
    res.status(200).send();
})
module.exports = router;

// http://127.0.0.1:3000/api/getAllHouseInfo
// http://127.0.0.1:3000/api/getSpecifyHouseInfo