const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

router.post('/add-free-slot', consultationController.addFreeSlot);
router.get('/free-slots', consultationController.getFreeSlots);
router.post('/book', consultationController.bookFreeSlot);
router.get('/appointments/:patientName', consultationController.getAppointments);
router.get('/future-appointments', consultationController.getFutureAppointments);
router.delete('/free-slots/:slotId', consultationController.deleteFreeSlot);
router.delete('/appointments/:patientId', consultationController.deleteAppointmentByPatientId);

module.exports = router;
