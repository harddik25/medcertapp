const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadDocument } = require('../controllers/documentController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('document'), uploadDocument);

module.exports = router;
