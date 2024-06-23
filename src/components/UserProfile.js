import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Avatar, Paper, Snackbar, Alert } from '@mui/material';
import { green, deepOrange } from '@mui/material/colors';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
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
      main: green[500],
    },
    secondary: {
      main: deepOrange[500],
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

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 16,
});

const StyledPaper = styled(Paper)({
  padding: 24,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 16,
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
});

const StyledButton = styled(Button)({
  marginBottom: 16,
  padding: '12px 24px',
  textTransform: 'none',
  borderRadius: 8,
  fontSize: '1.2rem',
  color: '#fff',
  backgroundColor: '#388e3c',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#82e082',
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
  },
});

const UserProfile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const telegramUser = JSON.parse(localStorage.getItem('telegramUser'));
      if (telegramUser) {
        try {
          const response = await fetch(`https://medlevel.me/api/users/role/${telegramUser.id}`);
          const data = await response.json();
          const userWithRole = { ...telegramUser, role: data.role };
          setUser(userWithRole);
          localStorage.setItem('telegramUser', JSON.stringify(userWithRole));
        } catch (error) {
          console.error('Ошибка при получении данных пользователя', error);
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (user) {
        try {
          console.log('Fetching certificate for user:', user.id); // Логирование ID пользователя
          const response = await fetch(`https://medlevel.me/api/users/certificate/${user.id}`);
          const data = await response.json();
          console.log('Received certificate data:', data); // Логирование полученных данных сертификата
          if (data.filename) {
            setCertificate(data.filename);
          } else {
            console.log('No certificate found.');
          }
        } catch (error) {
          console.error('Ошибка при получении сертификата', error);
        }
      }
    };

    fetchCertificate();
  }, [user]);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (user) {
        try {
          console.log('Fetching appointment for user:', user.id);
          const response = await fetch(`https://medlevel.me/api/consultations/appointments/${user.id}`);
          const responseText = await response.text(); // Получаем текстовый ответ для логирования
          console.log('Response text:', responseText); // Логируем текстовый ответ
          const data = JSON.parse(responseText); // Парсим JSON вручную для отладки
          console.log('Received appointment data:', data);
          if (data.appointment) {
            setAppointment(data.appointment);
          } else {
            console.log('No appointment found for user.');
          }
        } catch (error) {
          console.error('Ошибка при получении записи на консультацию', error);
        }
      }
    };

    fetchAppointment();
  }, [user]);

  const handleBuyCertificate = () => {
    navigate('/agreement');
  };

  const handleCertificateInfo = () => {
    navigate('/certificate-info');
  };

  const handleAdminPanel = () => {
    navigate('/admin');
  };

  const handleDoctorPanel = () => {
    navigate('/doctor');
  };

  const handleJoinConsultation = () => {
    const currentTime = new Date();
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}:00`);

    const timeDifference = (appointmentDate - currentTime) / 1000 / 60; // Разница во времени в минутах

    if (timeDifference <= 15) {
      window.open(appointment.telegramLink, '_blank');
    } else {
      setSnackbarMessage(t('You can join the consultation only 15 minutes before its start'));
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
          <StyledPaper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Header>
                {user && (
                  <>
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 80, height: 80 }}>
                      <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <LanguageSwitcher />
                  </>
                )}
              </Header>
              {user && (
                <>
                  <Typography component="h1" variant="h5" sx={{ color: theme.palette.primary.main }}>
                    {t('User Profile')}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2, mb: 4, color: theme.palette.primary.main }}>
                    {t('Welcome')}, {user.first_name}!
                  </Typography>
                  {user.role === 'admin' && (
                    <>
                      <StyledButton
                        fullWidth
                        variant="contained"
                        onClick={handleAdminPanel}
                      >
                        {t('Admin Panel')}
                      </StyledButton>
                      <StyledButton
                        fullWidth
                        variant="contained"
                        onClick={handleDoctorPanel}
                      >
                        {t('Doctor Panel')}
                      </StyledButton>
                    </>
                  )}
                  {user.role === 'doctor' && (
                    <StyledButton
                      fullWidth
                      variant="contained"
                      onClick={handleDoctorPanel}
                    >
                      {t('Doctor Panel')}
                    </StyledButton>
                  )}
                  {certificate ? (
                    <StyledButton
                      fullWidth
                      variant="contained"
                      href={`https://medlevel.me/api/documents/download/certificate/${user.id}/${certificate}`}
                      target="_blank"
                    >
                      {t('Download Certificate')}
                    </StyledButton>
                  ) : (
                    <>
                      {appointment ? (
                        <>
                          <Typography variant="body1" sx={{ mt: 2, mb: 4, color: theme.palette.primary.main }}>
                            {t('Your consultation appointment is on')} {appointment.date} {appointment.time}
                          </Typography>
                          {appointment.telegramLink && (
                            <StyledButton
                              fullWidth
                              variant="contained"
                              onClick={handleJoinConsultation}
                            >
                              {t('Join Consultation')}
                            </StyledButton>
                          )}
                        </>
                      ) : (
                        <StyledButton
                          fullWidth
                          variant="contained"
                          onClick={handleCertificateInfo}
                        >
                          {t('About Certificate')}
                        </StyledButton>
                      )}
                    </>
                  )}
                  {!certificate && !appointment && (
                    <StyledButton
                      fullWidth
                      variant="contained"
                      onClick={handleBuyCertificate}
                    >
                      {t('Buy Certificate')}
                    </StyledButton>
                  )}
                </>
              )}
            </Box>
          </StyledPaper>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="warning">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default UserProfile;

