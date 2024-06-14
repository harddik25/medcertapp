const User = require('../models/User');

exports.getUserByTelegramId = async (req, res) => {
  const { telegramId } = req.params;

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
