const User = require('../models/User');

exports.updateUserRoleByTelegramId = async (req, res) => {
  const { telegramId, role } = req.body;

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.role = role;
    await user.save();
    res.json({ message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
