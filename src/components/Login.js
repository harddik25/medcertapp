import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CssBaseline, Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';

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
      main: '#f44336',
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

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTelegramWebApp = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const telegram = window.Telegram.WebApp;
        const initData = telegram.initData;
        if (initData) {
          const user = telegram.initDataUnsafe.user;
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
        console.error('Telegram WebApp объект отсутствует. Убедитесь, что вы открываете приложение через Telegram.');
      }
    };

    // Добавляем небольшую задержку перед проверкой
    setTimeout(checkTelegramWebApp, 1000);
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
              <Typography component="h1" variant="h5" sx={{ color: theme.palette.primary.main, marginBottom: 2 }}>
                Вход через Telegram
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 4, color: theme.palette.secondary.main }}>
                Загрузка...
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default Login;



