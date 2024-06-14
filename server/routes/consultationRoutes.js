const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { authMiddleware } = require('../authMiddleware');

router.get('/appointments', authMiddleware, consultationController.getAppointments);
router.post('/schedule', authMiddleware, consultationController.scheduleAppointment);

module.exports = router;
