import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline, Paper, Snackbar, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import CannabisBackground from './cannabis-background.webp';
import LanguageSwitcher from './LanguageSwitcher';

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
  background: ' #388e3c',
  color: '#fff',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  padding: '12px 24px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  '&:hover': {
    background: '#96f296',
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Consultation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      const response = await fetch('https://medlevel.me/api/consultations/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time, userId: user.id }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Перенаправление на страницу оплаты Stripe
      } else {
        setBookingStatus('Ошибка при создании Stripe сессии');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setBookingStatus('Ошибка при создании Stripe сессии');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <LanguageSwitcher />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ color: theme.palette.primary.main }}>
                Видеоконсультация
              </Typography>
              <Box sx={{ mt: 1, width: '100%' }}>
                {availableSlots.length === 0 ? (
                  <Typography variant="body1" sx={{ color: '#f44336' }}>
                    Просим прощения, но в ближайшие даты записей нет.
                  </Typography>
                ) : (
                  <>
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
                    <StyledButton
                      type="button"
                      fullWidth
                      onClick={handleBooking}
                    >
                      Забронировать
                    </StyledButton>
                  </>
                )}
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
    </ThemeProvider>
  );
};

export default Consultation;


