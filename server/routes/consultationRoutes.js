const express = require('express');
const { bookConsultation, getConsultations } = require('../controllers/consultationController');
const router = express.Router();

router.post('/book', bookConsultation);
router.get('/appointments', getConsultations);

module.exports = router;
