const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI; // Убедитесь, что MONGO_URI правильно настроен в .env файле

exports.getUserByTelegramId = async (req, res) => {
  const { telegramId } = req.params;
  console.log(`Fetching user with Telegram ID: ${telegramId}`);

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('<dbname>'); // Замените на имя вашей базы данных
    const collection = database.collection('users');
    const user = await collection.findOne({ telegramId });

    if (!user) {
      console.log(`User not found for Telegram ID: ${telegramId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User found: ${user}`);
    res.json({ role: user.role });
  } catch (error) {
    console.error('Error fetching user by Telegram ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    await client.close();
  }
};
