const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middleware/upload'); // Модуль для обработки загрузки файлов (например, Multer)

router.post('/upload', upload.single('document'), documentController.uploadDocument);

module.exports = router;
