import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from '../logos/cannabis-background.jpeg';

const theme = createTheme();

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const Agreement = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/document-upload');
  };

  const handleDecline = () => {
    navigate('/profile');
  };

  const handlePrivacyPolicy = () => {
    window.open('https://telegra.ph/Privacy-Policy-01-14-35', '_blank');
  };

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
                Добро пожаловать
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, mb: 4, color: '#4caf50' }}>
                Пожалуйста, примите соглашение о данных перед покупкой сертификата.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleAccept}
              >
                Принять
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, backgroundColor: '#f44336', color: '#fff' }}
                onClick={handleDecline}
              >
                Отказаться
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2, color: '#4caf50' }}
                onClick={handlePrivacyPolicy}
              >
                Подробнее о политике данных
              </Button>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default Agreement;
