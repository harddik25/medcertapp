const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

// Маршруты для консультаций
router.get('/appointments', consultationController.getAppointments);
router.post('/schedule', consultationController.scheduleAppointment);
router.post('/add-free-slot', consultationController.addFreeSlot);
router.get('/free-slots', consultationController.getFreeSlots);
router.post('/book', consultationController.bookFreeSlot);
router.get('/future-appointments', consultationController.getFutureAppointments);

module.exports = router;
