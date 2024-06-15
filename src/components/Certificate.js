import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import CannabisBackground from './cannabis-background.webp'; // Замените на путь к вашему фоновому изображению

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const Certificate = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    dob: '',
    address: '',
    certificate: '',
    paymentInfo: ''
  });
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('https://medlevel.me/api/certificates/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setPurchaseStatus('Покупка успешна! Ваш сертификат: ' + data.certificate.name);
        setOpenSnackbar(true);
      } else {
        setPurchaseStatus('Ошибка при покупке сертификата');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setPurchaseStatus('Ошибка при покупке сертификата');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Background>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c' }}>
              Купить сертификат
            </Typography>
            <Box sx={{ mt: 1, width: '100%' }}>
              {step === 1 && (
                <>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Ваше имя"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Дата рождения"
                    name="dob"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={form.dob}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Адрес"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                    onClick={handleNextStep}
                  >
                    Далее
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Название сертификата"
                    name="certificate"
                    value={form.certificate}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Информация для оплаты"
                    name="paymentInfo"
                    value={form.paymentInfo}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                    onClick={handlePurchase}
                  >
                    Купить
                  </Button>
                </>
              )}
              {purchaseStatus && (
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                  <Alert onClose={handleCloseSnackbar} severity={purchaseStatus.includes('успешна') ? 'success' : 'error'}>
                    {purchaseStatus}
                  </Alert>
                </Snackbar>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default Certificate;

