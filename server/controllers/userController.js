const User = require('../models/User');
const fs = require('fs');
const path = require('path');

exports.getUserRoleByTelegramId = async (req, res) => {
  try {
    const { telegramId } = req.params;
    const user = await User.findOne({ telegramId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Error fetching user by Telegram ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCertificate = async (req, res) => {
  try {
    const { userId } = req.params;
    const certificatePath = path.join(`/var/www/user4806313/data/${userId}/certificate`);

    console.log('Fetching certificate for user:', userId); // Логирование ID пользователя
    console.log('Certificate path:', certificatePath);

    if (!fs.existsSync(certificatePath)) {
      console.log('Certificate path does not exist:', certificatePath); // Логирование отсутствия пути
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const files = fs.readdirSync(certificatePath);
    if (files.length === 0) {
      console.log('No certificate files found in path:', certificatePath); // Логирование отсутствия файлов
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const filename = files[0]; // Assuming there's only one certificate per user
    console.log('Found certificate:', filename); // Логирование найденного файла
    res.status(200).json({ filename });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

