import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CssBaseline, Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from '../logos/cannabis-background.jpeg'; // Замените на путь к вашему фоновому изображению

const theme = createTheme();

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const telegram = window.Telegram;
    if (telegram && telegram.WebApp) {
      const initData = telegram.WebApp.initData;
      if (initData) {
        const user = telegram.WebApp.initDataUnsafe.user;
        if (user) {
          localStorage.setItem('telegramUser', JSON.stringify(user));
          navigate('/profile');
        } else {
          console.error('Ошибка аутентификации через Telegram');
        }
      } else {
        console.error('Telegram WebApp initData отсутствует');
      }
    } else {
      console.error('Telegram WebApp объект отсутствует');
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: 2 }}>
                Вход через Telegram
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 4, color: '#4caf50' }}>
                Пожалуйста, откройте это приложение через Telegram для автоматической аутентификации.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default Login;





