const express = require('express');
const router = express.Router();
const db = require('../DB/db');

router.get('/test', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM Users');
    res.json(rows[0].Password);
});

module.exports = router;