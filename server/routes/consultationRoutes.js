const express = require('express');
const router = express.Router();
const { getAppointments, scheduleAppointment } = require('../controllers/consultationController');

router.get('/appointments', getAppointments);
router.post('/schedule', scheduleAppointment);

module.exports = router;
