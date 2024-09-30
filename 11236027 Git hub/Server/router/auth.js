const express = require('express');
const auth = express.Router();

auth.post('/login', (req, res) => {
    console.log(req.query)
}) 

module.exports = auth;