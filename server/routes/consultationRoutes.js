const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

router.get('/appointments', consultationController.getAppointments);
router.post('/schedule', consultationController.scheduleAppointment);

module.exports = router;
