const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/role/:telegramId', userController.getUserRole);
router.put('/role/:userId', userController.updateUserRole);
router.get('/', userController.getUsers);

module.exports = router;
