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
const stripeRoutes = require('./routes/stripeRoutes');
const stripeWebhook = require('./routes/stripeWebhook');

const app = express();


app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
app.use('/api/stripe', stripeRoutes);
app.use('/api/stripe/webhook', stripeWebhook);
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/documents', documentRoutes);


app.use(express.static('/var/www/medlevel.me'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('/var/www/medlevel.me', 'index.html'));
});



module.exports = app;

