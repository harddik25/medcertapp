const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

router.post('/add-free-slot', consultationController.addFreeSlot);
router.get('/free-slots', consultationController.getFreeSlots);
router.post('/book', consultationController.bookFreeSlot);
router.get('/appointments/:patientName', consultationController.getAppointments);
router.get('/future-appointments', consultationController.getFutureAppointments);
router.delete('/free-slots/:slotId', consultationController.deleteFreeSlot);
router.delete('/appointments/:patientId', consultationController.deleteAppointmentByPatientId);
router.post('/create-checkout-session', async (req, res) => {
  const { date, time, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Consultation',
            },
            unit_amount: 6500, // 65 евро
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      client_reference_id: userId,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

module.exports = router;
