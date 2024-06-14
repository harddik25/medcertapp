const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/telegram', authController.telegramAuth);

module.exports = router;
