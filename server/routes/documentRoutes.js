const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('./upload'); // Импортируем middleware для загрузки файлов

router.post('/upload', upload.fields([{ name: 'frontDocument', maxCount: 1 }, { name: 'backDocument', maxCount: 1 }]), documentController.uploadDocument);
router.get('/download/:userId/:documentType/:side/:fileName', documentController.downloadDocument);
module.exports = router;
