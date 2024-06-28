import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline, Paper } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CannabisBackground from './cannabis-background.webp';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const stripePromise = loadStripe('your-publishable-key-here'); // замените на ваш публичный ключ Stripe

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.5px',
    },
  },
  palette: {
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const StyledButton = styled(Button)(({ theme }) => ({
  background: '#96f296',
  color: '#000',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  padding: '12px 24px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  '&:hover': {
    background: '#96f296',
  },
}));

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const [tipAmount, setTipAmount] = useState('');
  const [comment, setComment] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message);
        return;
      }

      const response = await fetch('/api/payments/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 6500 + parseInt(tipAmount * 100), // стоимость 65 евро + чаевые
          payment_method: paymentMethod.id,
          comment: comment,
        }),
      });

      const paymentIntent = await response.json();

      const confirmCardPayment = await stripe.confirmCardPayment(paymentIntent.client_secret);

      if (confirmCardPayment.error) {
        setPaymentError(confirmCardPayment.error.message);
      } else {
        setPaymentSuccess(t('Payment successful!'));
      }
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <Typography variant="h6" gutterBottom>
        {t('Payment Details')}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        label={t('Tip Amount (in euros)')}
        value={tipAmount}
        onChange={(e) => setTipAmount(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label={t('Comment')}
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2 }}
      />
      <StyledButton type="submit" fullWidth>
        {t('Pay 65 Euros')}
      </StyledButton>
      {paymentError && (
        <Typography variant="body1" color="error">
          {paymentError}
        </Typography>
      )}
      {paymentSuccess && (
        <Typography variant="body1" color="primary">
          {paymentSuccess}
        </Typography>
      )}
    </form>
  );
};

const Payment = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: 2 }}>
                  {t('Payment')}
                </Typography>
                <LanguageSwitcher />
              </Box>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default Payment;