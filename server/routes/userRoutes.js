const express = require('express');
const router = express.Router();
const { updateUserRoleByTelegramId } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../authMiddleware');

router.put('/role', verifyToken, isAdmin, updateUserRoleByTelegramId);

module.exports = router;
