const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/сlientRoutes');
const documentRoutes = require('./routes/documentRoutes');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Настройка маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/documents', documentRoutes);

app.get('/api/users/avatar/:userId', async (req, res) => {
  const { userId } = req.params;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${userId}`);
    const data = await response.json();

    if (data.ok && data.result.photos.length > 0) {
      const photo = data.result.photos[0][0].file_id;
      const fileResponse = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${photo}`);
      const fileData = await fileResponse.json();
      const fileUrl = `https://api.telegram.org/file/bot${botToken}/${fileData.result.file_path}`;

      res.status(200).json({ avatarUrl: fileUrl });
    } else {
      res.status(404).json({ message: 'Avatar not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching avatar', error });
  }
});

app.use(express.static('/var/www/medlevel.me'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('/var/www/medlevel.me', 'index.html'));
});



module.exports = app;
