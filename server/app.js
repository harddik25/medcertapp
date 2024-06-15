const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
require('dotenv').config();

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');

// Инициализация приложения
const app = express();

// Настройка middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Подключение к MongoDB с использованием MongoClient
const uri = process.env.MONGO_URI; // Убедитесь, что MONGO_URI правильно настроен в .env файле

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function initializeDatabase() {
  try {
    const database = client.db('medapp');

    // Проверка и создание коллекций, если они не существуют
    const collections = ['users', 'appointments', 'certificates', 'consultations', 'surveys'];
    const existingCollections = await database.listCollections().toArray();
    const existingCollectionNames = existingCollections.map(col => col.name);

    for (const collection of collections) {
      if (!existingCollectionNames.includes(collection)) {
        await database.createCollection(collection);
        console.log(`Collection ${collection} created!`);
      } else {
        console.log(`Collection ${collection} already exists.`);
      }
    }
  } catch (error) {
    console.error('Ошибка при инициализации базы данных', error);
  }
}

async function run() {
  try {
    // Подключение клиента к серверу
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    // Инициализация базы данных
    await initializeDatabase();

    // Настройка маршрутов после успешного подключения
    app.use('/api/auth', authRoutes);
    app.use('/api/certificates', certificateRoutes);
    app.use('/api/consultations', consultationRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/surveys', surveyRoutes);
    app.use('/api/appointments', appointmentRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/documents', documentRoutes);

    // Настройка пути к статическим файлам
    app.use(express.static('/var/www/medlevel.me'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve('/var/www/medlevel.me', 'index.html'));
    });

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

run().catch(console.dir);

module.exports = app;
