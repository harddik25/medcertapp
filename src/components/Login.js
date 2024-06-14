import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CssBaseline, Paper } from '@mui/material';
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

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, поддерживает ли браузер Telegram Web App SDK
    if (window.Telegram.WebApp) {
      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;

      if (telegramUser) {
        // Сохраняем пользователя в локальное хранилище или состояние
        localStorage.setItem('telegramUser', JSON.stringify(telegramUser));
        
        // Вы можете отправить данные на сервер для авторизации
        fetch('https://medlevel.me/api/auth/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(telegramUser)
        })
        .then(response => response.json())
        .then(data => {
          // Обработка ответа сервера
          console.log('User authenticated:', data);
          navigate('/language');
        })
        .catch(error => {
          console.error('Error during authentication:', error);
        });
      }
    }
  }, [navigate]);

  return (
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
            <Box sx={{ mt: 1 }} id="telegram-login"></Box>
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default Login;

