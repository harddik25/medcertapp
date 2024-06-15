const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

router.post('/add-free-slot', consultationController.addFreeSlot);
router.get('/free-slots', consultationController.getFreeSlots);
router.delete('/free-slots/:id', consultationController.deleteFreeSlot);
router.post('/book', consultationController.bookFreeSlot);
router.get('/appointments', consultationController.getAppointments);
router.get('/future-appointments', consultationController.getFutureAppointments);

module.exports = router;
