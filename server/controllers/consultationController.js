const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

async function getAppointments(req, res) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('medapp');
    const appointments = await database.collection('appointments').find().toArray();
    res.json({ appointments });
  } catch (error) {
    console.error('Ошибка при получении списка консультаций', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  } finally {
    await client.close();
  }
}

async function scheduleAppointment(req, res) {
  const { date, time } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('medapp');
    const result = await database.collection('appointments').insertOne({ date, time });
    res.json({ success: true, appointment: result.ops[0] });
  } catch (error) {
    console.error('Ошибка при сохранении времени приема', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  } finally {
    await client.close();
  }
}

module.exports = {
  getAppointments,
  scheduleAppointment
};

