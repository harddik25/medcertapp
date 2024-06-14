const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/appointments', appointmentController.getAppointments);
router.post('/book', appointmentController.bookAppointment);
router.post('/schedule', appointmentController.scheduleSlot);
router.get('/available', appointmentController.getAvailableSlots);

module.exports = router;
