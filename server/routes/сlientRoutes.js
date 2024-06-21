const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const upload = require('../middlewares/multer');

router.post('/documents/upload-certificate', upload.single('certificate'), clientController.uploadCertificate);
router.get('/info/:patientId', clientController.getClientInfo);

module.exports = router;
