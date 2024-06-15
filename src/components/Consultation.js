import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline, Paper, Snackbar, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import CannabisBackground from '../logos/cannabis-background.jpeg'; // Замените на путь к вашему фоновому изображению

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

const Consultation = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await fetch('https://medlevel.me/api/consultations/free-slots');
        const data = await response.json();
        setAvailableSlots(data.freeSlots);
      } catch (error) {
        console.error('Ошибка при получении доступных временных слотов', error);
      }
    };

    fetchAvailableSlots();
  }, []);

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem('telegramUser'));
    if (!user) {
      setBookingStatus('Ошибка: пользователь не авторизован');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch('https://medlevel.me/api/consultations/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time, userId: user.id }), // Замените на ID пользователя
      });
      const data = await response.json();
      if (data.success) {
        setBookingStatus('Бронирование успешно! Ваше время: ' + date + ' ' + time);
        setOpenSnackbar(true);
      } else {
        setBookingStatus('Ошибка при бронировании консультации');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setBookingStatus('Ошибка при бронировании консультации');
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
              Видеоконсультация
            </Typography>
            <Box sx={{ mt: 1, width: '100%' }}>
              <TextField
                select
                variant="outlined"
                fullWidth
                label="Дата"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{ mb: 2 }}
              >
                {availableSlots.map((slot, index) => (
                  <MenuItem key={index} value={slot.date}>
                    {slot.date}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                variant="outlined"
                fullWidth
                label="Время"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                sx={{ mb: 2 }}
                disabled={!date}
              >
                {availableSlots
                  .filter((slot) => slot.date === date)
                  .map((slot, index) => (
                    <MenuItem key={index} value={slot.time}>
                      {slot.time}
                    </MenuItem>
                  ))}
              </TextField>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleBooking}
              >
                Забронировать
              </Button>
              {bookingStatus && (
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                  <Alert onClose={handleCloseSnackbar} severity={bookingStatus.includes('успешно') ? 'success' : 'error'}>
                    {bookingStatus}
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

export default Consultation;
