import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const CertificateInfo = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/profile');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              Информация о сертификате
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Здесь будет информация о вашем сертификате, как на сайте https://www.federacioncannabica.com/en/cerificados.
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={handleBackClick}>
              Назад к личному кабинету
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CertificateInfo;
