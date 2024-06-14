const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB', err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/appointments', appointmentRoutes);

// Маршрут для обработки аутентификации через Telegram
app.get('/auth', (req, res) => {
  const { id, first_name, last_name, username, photo_url, auth_date, hash } = req.query;
  // Проверьте hash и сохраните данные пользователя в вашей системе
  res.json({ id, first_name, last_name, username, photo_url, auth_date, hash });
});

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

module.exports = app;
