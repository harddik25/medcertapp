const User = require('../models/User');

exports.getUserByTelegramId = async (req, res) => {
  const { telegramId } = req.params;
  console.log(`Fetching user with Telegram ID: ${telegramId}`);

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      console.log(`User not found for Telegram ID: ${telegramId}`);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(`User found: ${user}`);
    res.json({ role: user.role });
  } catch (error) {
    console.error('Error fetching user by Telegram ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
