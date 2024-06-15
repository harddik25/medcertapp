const { MongoClient, ObjectID } = require('mongodb');
const uri = process.env.MONGO_URI;

async function getUsers(req, res) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    const users = await database.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Ошибка при получении списка пользователей', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  } finally {
    await client.close();
  }
}

async function updateUserRole(req, res) {
  const { userId } = req.params;
  const { role } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    const result = await database.collection('users').updateOne(
      { telegramId: userId },
      { $set: { role } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при обновлении роли пользователя', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  } finally {
    await client.close();
  }
}

async function getUserRole(req, res) {
  const { telegramId } = req.params;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    const user = await database.collection('users').findOne({ telegramId });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ role: user.role });
  } catch (error) {
    console.error('Ошибка при получении роли пользователя', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  } finally {
    await client.close();
  }
}

module.exports = {
  getUsers,
  updateUserRole,
  getUserRole
};


