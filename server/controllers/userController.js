const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

// Получение списка пользователей
exports.getUsers = async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('test'); // Замените на ваше имя базы данных
    const users = await database.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('Ошибка при получении списка пользователей', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  } finally {
    await client.close();
  }
};

// Обновление роли пользователя
exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('test'); // Замените на ваше имя базы данных
    const result = await database.collection('users').updateOne(
      { _id: new MongoClient.ObjectID(userId) },
      { $set: { role } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка при обновлении роли пользователя', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  } finally {
    await client.close();
  }
};

// Получение роли пользователя по Telegram ID
exports.getUserRole = async (req, res) => {
  const { telegramId } = req.params;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('test'); // Замените на ваше имя базы данных
    const user = await database.collection('users').findOne({ telegramId });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Ошибка при получении роли пользователя', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  } finally {
    await client.close();
  }
};
