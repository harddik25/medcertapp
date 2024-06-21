const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const upload = require('./upload');

router.post('/upload-certificate', upload.single('certificate'), clientController.uploadCertificate);
router.get('/info/:patientId', clientController.getClientInfo);

module.exports = router;
