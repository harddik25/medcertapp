const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const multer = require('multer');

router.post('/upload', upload.single('document'), documentController.uploadDocument);

module.exports = router;
