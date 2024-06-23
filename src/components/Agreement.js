import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, CssBaseline, Paper, Button } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

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
      main: '#96f296',
    },
    secondary: {
      main: '#ff6b72',
    },
    background: {
      default: '#f5f5eb',
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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  marginBottom: '16px',
  padding: '12px 24px',
  textTransform: 'none',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
}));

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
              <StyledButton fullWidth onClick={handleAccept}>
                {t('Accept')}
              </StyledButton>
              <StyledButton fullWidth color="secondary" onClick={handleDecline}>
                {t('Decline')}
              </StyledButton>
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


