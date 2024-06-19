const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('./upload'); // Импортируем middleware для загрузки файлов

router.post('/upload', upload.fields([{ name: 'frontDocument', maxCount: 1 }, { name: 'backDocument', maxCount: 1 }]), documentController.uploadDocument);

module.exports = router;
