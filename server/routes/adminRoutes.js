const express = require('express');
const { getUsers, getCertificates } = require('../controllers/adminController');
const router = express.Router();

router.get('/users', getUsers);
router.get('/certificates', getCertificates);

module.exports = router;
