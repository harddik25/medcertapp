const User = require('../models/User');

exports.verifyAdmin = async (req, res, next) => {
  const adminId = req.body.adminId; // Здесь мы будем проверять ID администратора

  if (!adminId) {
    return res.status(400).json({ message: 'Admin ID is required' });
  }

  const user = await User.findOne({ telegramId: adminId });
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};
