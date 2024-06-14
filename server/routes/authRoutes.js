const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/telegram', authController.telegramAuth);

module.exports = router;
