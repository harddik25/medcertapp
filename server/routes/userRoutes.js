const express = require('express');
const router = express.Router();
const { getUserByTelegramId } = require('../controllers/userController');

router.get('/role/:telegramId', getUserByTelegramId);

module.exports = router;
