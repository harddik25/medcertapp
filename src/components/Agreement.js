import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

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
  const { t } = useTranslation();

  const handleAccept = () => {
    navigate('/main-survey');
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: 2 }}>
                  {t('Welcome')}
                </Typography>
                <LanguageSwitcher />
              </Box>
              <Typography variant="body1" sx={{ mt: 2, mb: 4, color: '#4caf50' }}>
                {t('Please accept the data agreement before purchasing the certificate.')}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleAccept}
              >
                {t('Accept')}
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2, backgroundColor: '#f44336', color: '#fff' }}
                onClick={handleDecline}
              >
                {t('Decline')}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2, color: '#4caf50' }}
                onClick={handlePrivacyPolicy}
              >
                {t('Privacy Policy')}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default Agreement;

