const express = require('express');
const router = express.Router();
const { updateUserRole } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.put('/:id/role', verifyToken, isAdmin, updateUserRole);

module.exports = router;
