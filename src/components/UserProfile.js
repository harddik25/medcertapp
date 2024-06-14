import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Avatar, Paper } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { styled } from '@mui/system';
import CannabisBackground from '../logos/cannabis-background.jpeg'; // Замените на путь к вашему фоновому изображению

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const userParam = query.get('user');
    
    if (userParam) {
      const user = JSON.parse(userParam);
      setUser(user);
      localStorage.setItem('telegramUser', JSON.stringify(user));
    } else {
      const storedUser = localStorage.getItem('telegramUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (user) {
      const fetchCertificate = async () => {
        try {
          const response = await fetch('https://medlevel.me/api/certificates/status', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.id}` // Замените на ваш метод аутентификации
            }
          });
          const data = await response.json();
          setCertificate(data.certificate);
        } catch (error) {
          console.error('Ошибка при получении статуса сертификата', error);
        }
      };

      fetchCertificate();
    }
  }, [user]);

  const handleBuyCertificate = () => {
    navigate('/survey');
  };

  const handleCertificateInfo = () => {
    navigate('/certificate-info');
  };

  if (!user) {
    return null;
  }

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
            <Avatar sx={{ bgcolor: deepOrange[500], width: 80, height: 80, mb: 2 }}>
              {user.first_name[0]}
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c' }}>
              Профиль пользователя
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 4, color: '#4caf50' }}>
              Добро пожаловать, {user.first_name}!
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
              onClick={handleCertificateInfo}
            >
              О сертификате
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
                  Посмотреть сертификат
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                >
                  Статус: {certificate.status}
                </Button>
              )
            ) : (
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleBuyCertificate}
              >
                Купить сертификат
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default UserProfile;


