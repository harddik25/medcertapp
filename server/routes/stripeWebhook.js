const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const Consultation = require('../models/Consultation');

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;

    // Обновление статуса бронирования
    try {
      await Consultation.updateOne({ patientName: userId, status: 'pending' }, { status: 'paid' });
      console.log(`Consultation for user ${userId} marked as paid.`);
    } catch (error) {
      console.error('Error updating consultation status:', error);
    }
  }

  res.sendStatus(200);
});

module.exports = router;
