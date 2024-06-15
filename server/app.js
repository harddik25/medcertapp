const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
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

// Подключение к MongoDB с использованием Mongoose
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Successfully connected to MongoDB!");

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

}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

module.exports = app;

