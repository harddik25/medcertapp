const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/info/:patientId', clientController.getClientInfo);

module.exports = router;
