import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Container, Box, Typography, CssBaseline, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

  const handleTelegramLogin = useCallback((user) => {
    // Логика обработки ответа Telegram API
    console.log(user);
    // Сохранение пользователя в локальное хранилище или состояние
    localStorage.setItem('telegramUser', JSON.stringify(user));
    navigate('/language');
  }, [navigate]);

  useEffect(() => {
    const user = localStorage.getItem('telegramUser');
    if (user) {
      navigate('/language');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const telegramUser = {
      id: urlParams.get('id'),
      first_name: urlParams.get('first_name'),
      last_name: urlParams.get('last_name'),
      username: urlParams.get('username'),
      photo_url: urlParams.get('photo_url'),
      auth_date: urlParams.get('auth_date'),
      hash: urlParams.get('hash')
    };

    if (telegramUser.id) {
      handleTelegramLogin(telegramUser);
    } else {
      const script = document.createElement('script');
      script.src = "https://telegram.org/js/telegram-widget.js?7";
      script.async = true;
      script.setAttribute('data-telegram-login', 'YourBotName'); // Замените 'YourBotName' на имя вашего бота
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '5');
      script.setAttribute('data-auth-url', 'https://your-backend.com/auth'); // Замените на ваш URL обработки авторизации
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-userpic', 'false');
      script.onload = () => {
        if (window.TelegramLoginWidget) {
          window.TelegramLoginWidget.dataOnauth = handleTelegramLogin;
        }
      };
      document.getElementById('telegram-login').appendChild(script);
    }
  }, [handleTelegramLogin, navigate]);

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
              <Box sx={{ mt: 1 }} id="telegram-login"></Box>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default Login;
