const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const consultationController = require('../controllers/consultationController');

router.get('/role/:telegramId', userController.getUserRoleByTelegramId);
router.get('/user/:userId', userController.getUserById); // Добавлено для получения информации о пользователе
router.get('/consultations/user/:userId', consultationController.getAppointmentByUserId);
router.get('/certificate/:userId', userController.getCertificate);

module.exports = router;
