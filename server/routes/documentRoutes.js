const express = require('express');
const router = express.Router();
const multer = require('multer');
const documentController = require('../controllers/documentController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('document'), documentController.uploadDocument);
router.get('/download/:userId/:documentType/:documentName', documentController.downloadDocument);

module.exports = router;
