const express = require('express');
const router = express.Router();
const { getUsers, updateUserRole, getUserRole } = require('../controllers/userController');

router.get('/', getUsers);
router.put('/:userId/role', updateUserRole);
router.get('/role/:telegramId', getUserRole);

module.exports = router;
