const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');
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
    const certificatePath = `/var/www/user4806313/data/${userId}/certificate`;

    console.log('Fetching certificate for user:', userId); // Логирование ID пользователя
    console.log('Certificate path:', certificatePath);

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
      await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false,
      });

      const list = await client.list(certificatePath);
      if (list.length === 0) {
        console.log('No certificate files found in path:', certificatePath); // Логирование отсутствия файлов
        return res.status(404).json({ message: 'Certificate not found' });
      }

      const filename = list[0].name; // Assuming there's only one certificate per user
      console.log('Found certificate:', filename); // Логирование найденного файла
      res.status(200).json({ filename });
    } catch (error) {
      console.error('Error accessing FTP server:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
      client.close();
    }
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
