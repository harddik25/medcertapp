import React from 'react';
import { Container, Box, Typography, Button, CssBaseline, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CannabisBackground from './cannabis-background.webp'; // Замените на путь к вашему фоновому изображению

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const LanguageSelection = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (language) => {
    localStorage.setItem('language', language);
    navigate('/profile');
  };

  return (
    <Background>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ marginBottom: 2, color: '#388e3c' }}>
              Выберите язык
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: '#4caf50', color: '#fff' }}
              onClick={() => handleLanguageSelect('en')}
            >
              English
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#4caf50', color: '#fff' }}
              onClick={() => handleLanguageSelect('es')}
            >
              Español
            </Button>
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default LanguageSelection;
