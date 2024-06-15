import React from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import CompanyLogo from './MedLevel.webp'; // Замените на путь к вашему логотипу
import CannabisBackground from './cannabis-background.webp'; // Замените на путь к вашему фоновому изображению

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const LoadingPage = () => {
  return (
    <Background>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 4,
            borderRadius: 2,
          }}
        >
          <img src={CompanyLogo} alt="Company Logo" style={{ width: '150px', marginBottom: '20px' }} />
          <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: '20px' }}>
            Welcome to MedLevel
          </Typography>
          <CircularProgress sx={{ color: '#388e3c' }} />
        </Box>
      </Container>
    </Background>
  );
};

export default LoadingPage;
