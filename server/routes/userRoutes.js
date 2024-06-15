const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/role/:telegramId', userController.getUserRoleByTelegramId);
router.get('/:userId', userController.getUserById);

module.exports = router;
