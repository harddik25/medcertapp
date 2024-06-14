import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CssBaseline, Paper, Button } from '@mui/material';
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

  const handleTelegramLogin = useCallback((user) => {
    console.log(user);
    localStorage.setItem('telegramUser', JSON.stringify(user));
    fetch('https://medlevel.me/api/auth/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      console.log('User authenticated:', data);
      navigate('/language');
    })
    .catch(error => {
      console.error('Error during authentication:', error);
    });
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.async = true;
    script.setAttribute('data-telegram-login', 'YourBotName'); // Замените 'YourBotName' на имя вашего бота
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '5');
    script.setAttribute('data-auth-url', 'https://medlevel.me/api/auth/telegram'); // Замените на ваш URL обработки авторизации
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'false');
    script.onload = () => {
      if (window.TelegramLoginWidget) {
        window.TelegramLoginWidget.dataOnauth = handleTelegramLogin;
      }
    };
    document.getElementById('telegram-login').appendChild(script);
  }, [handleTelegramLogin]);

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
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => {
                document.getElementById('telegram-login').querySelector('script').click();
              }}
            >
              Войти через Telegram
            </Button>
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default Login;
