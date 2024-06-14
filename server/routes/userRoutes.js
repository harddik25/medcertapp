const express = require('express');
const router = express.Router();
const { updateUserRoleByTelegramId } = require('../controllers/userController');
const { verifyAdmin } = require('../authMiddleware');

router.put('/role', verifyAdmin, updateUserRoleByTelegramId);

module.exports = router;
