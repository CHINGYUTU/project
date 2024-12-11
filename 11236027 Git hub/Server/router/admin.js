const express = require("express");
const admin = express.Router();
const db = require("../DB/db");

//測試用
admin.get("/adminTest", (req, res) => {
  res.send("this is adminAPI test page");
});

//回傳所有使用者資料
admin.post("/listmember", async (req, res) => {
  const [rows] = await db.query("SELECT ID, Name, Email, Role, Phone FROM Users;");
  res.json(rows);
});

//回傳為驗證房屋資訊
admin.post("/listnotreviewed", async (req, res) => {
  const [rows] = await db.query(
    "SELECT HouseInfo.*, Users.Name , Users.Phone , Users.Email  FROM HouseInfo JOIN Users ON HouseInfo.LandlordID = Users.ID WHERE HouseInfo.Verify = 0;"
  );
  res.send(rows);
});

admin.post("/passpost", async (req, res) => {
  await db.query("UPDATE HouseInfo SET HouseInfo.Verify = 1 WHERE HouseInfo.ID = ?", [req.body.ID]);
  res.status(200).send();
});

admin.post("/failedpost", async (req, res) => {});

admin.post("/getFeedBackCheckList", async (req, res) => {
  const [rows] = await db.query(
    "SELECT  f.ID, f.ReleaseTime, f.Stars, f.HouseID, l.Name AS LandlordName,  u.Name AS UserName , f.Message FROM Feedback f JOIN Users l ON l.ID = f.LandlordID JOIN Users u ON u.ID = f.UserID WHERE f.LandlordCheck = 1 AND f.AdminCheck = 0;"
  );
  res.status(200).send(rows);
});

admin.post("/throughFeedBack", async (req, res) => {
  await db.query("UPDATE Feedback SET Feedback.AdminCheck = 1 WHERE Feedback.ID = ?", [req.body.ID]);
  res.status(200).send();
});

admin.post("/rejectFeedBack", async (req, res) => {
  await db.query("UPDATE Feedback SET Feedback.AdminCheck = -1 WHERE Feedback.ID = ?", [req.body.ID]);
  res.status(200).send();
});

module.exports = admin;
