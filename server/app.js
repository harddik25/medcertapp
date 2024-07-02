const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/documents', documentRoutes);

// Stripe Webhook
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.sendStatus(400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Обработка завершенной оплаты
    handleCheckoutSessionCompleted(session);
  }

  res.sendStatus(200);
});

function handleCheckoutSessionCompleted(session) {
  const userId = session.metadata.userId;
  // Обновите статус оплаты пользователя в вашей базе данных
  // Пример обновления в MongoDB
  User.findByIdAndUpdate(userId, { paid: true }, (err, user) => {
    if (err) {
      console.error('Ошибка обновления статуса оплаты пользователя:', err);
    } else {
      console.log('Статус оплаты пользователя обновлен:', user);
    }
  });
}

app.use(express.static('/var/www/medlevel.me'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('/var/www/medlevel.me', 'index.html'));
});

module.exports = app;

