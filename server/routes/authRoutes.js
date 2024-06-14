const express = require('express');
const router = express.Router();
const { telegramAuth } = require('../controllers/authController');

router.get('/telegram', telegramAuth);

module.exports = router;
