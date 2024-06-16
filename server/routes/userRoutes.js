const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/role/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ telegramId: id });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ role: user.role });
});

module.exports = router;
