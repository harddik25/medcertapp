const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('./upload'); // Импортируем middleware для загрузки файлов

router.post('/upload', upload.single('document'), documentController.uploadDocument);

module.exports = router;
