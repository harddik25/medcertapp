import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Avatar, Paper, Snackbar, Alert } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { styled } from '@mui/system';
import CannabisBackground from './cannabis-background.webp';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher'; // Добавьте компонент переключателя языка

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
const UserProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
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

          // Fetch avatar
          const avatarResponse = await fetch(`/api/users/avatar/${telegramUser.id}`);
          const avatarData = await avatarResponse.json();
          if (avatarData.avatarUrl) {
            setAvatarUrl(avatarData.avatarUrl);
          }
        } catch (error) {
          console.error('Ошибка при получении данных пользователя', error);
        }
      }
    };

    fetchUser();
  }, []);
  
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
    <Background>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header>
              {user && (
                <>
                  {avatarUrl ? (
                    <Avatar src={avatarUrl} sx={{ width: 80, height: 80 }} />
                  ) : (
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 80, height: 80 }}>
                      {user.first_name[0]}
                    </Avatar>
                  )}
                  <LanguageSwitcher />
                </>
              )}
            </Header>
            {user && (
              <>
                <Typography component="h1" variant="h5" sx={{ color: '#388e3c' }}>
                  {t('User Profile')}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 4, color: '#4caf50' }}>
                  {t('Welcome')}, {user.first_name}!
                </Typography>
                {user.role === 'admin' && (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mb: 2, backgroundColor: '#f44336', color: '#fff' }}
                      onClick={handleAdminPanel}
                    >
                      {t('Admin Panel')}
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mb: 2, backgroundColor: '#1976d2', color: '#fff' }}
                      onClick={handleDoctorPanel}
                    >
                      {t('Doctor Panel')}
                    </Button>
                  </>
                )}
                {user.role === 'doctor' && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2, backgroundColor: '#1976d2', color: '#fff' }}
                    onClick={handleDoctorPanel}
                  >
                    {t('Doctor Panel')}
                  </Button>
                )}
                {appointment ? (
                  <>
                    <Typography variant="body1" sx={{ mt: 2, mb: 4, color: '#4caf50' }}>
                      {t('Your consultation appointment is on')} {appointment.date} {appointment.time}
                    </Typography>
                    {appointment.telegramLink && (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                        onClick={handleJoinConsultation}
                      >
                        {t('Join Consultation')}
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                      onClick={handleCertificateInfo}
                    >
                      {t('About Certificate')}
                    </Button>
                    {certificate ? (
                      certificate.status === 'готов' ? (
                        <Button
                          component={Link}
                          to="/certificate"
                          fullWidth
                          variant="contained"
                          sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                        >
                          {t('View Certificate')}
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                        >
                          {t('Status')}: {certificate.status}
                        </Button>
                      )
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                        onClick={handleBuyCertificate}
                      >
                        {t('Buy Certificate')}
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </Box>
        </Paper>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="warning">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Background>
  );
};

export default UserProfile;



