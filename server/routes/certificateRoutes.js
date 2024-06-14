const express = require('express');
const { buyCertificate } = require('../controllers/certificateController');
const router = express.Router();

router.post('/buy', buyCertificate);

module.exports = router;
