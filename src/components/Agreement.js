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

const StyledPaper = styled(Paper)({
  padding: 24,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 16,
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
});

const StyledButton = styled(Button)({
  marginBottom: 16,
  padding: '12px 24px',
  textTransform: 'none',
  borderRadius: 8,
  fontSize: '1.2rem',
  color: '#000',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
  },
});

const AcceptButton = styled(StyledButton)({
  backgroundColor: '#96f296',
  '&:hover': {
    backgroundColor: '#82e082',
  },
});

const DeclineButton = styled(StyledButton)({
  backgroundColor: '#ff6b72',
  '&:hover': {
    backgroundColor: '#ff5b62',
  },
});

const InfoButton = styled(StyledButton)({
  backgroundColor: '#f5f5eb',
  color: '#000',
  '&:hover': {
    backgroundColor: '#e5e5db',
  },
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
          <StyledPaper elevation={3}>
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
              <AcceptButton
                fullWidth
                variant="contained"
                onClick={handleAccept}
              >
                {t('Accept')}
              </AcceptButton>
              <DeclineButton
                fullWidth
                variant="contained"
                onClick={handleDecline}
              >
                {t('Decline')}
              </DeclineButton>
              <InfoButton
                fullWidth
                variant="contained"
                onClick={handlePrivacyPolicy}
              >
                {t('Privacy Policy')}
              </InfoButton>
            </Box>
          </StyledPaper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default Agreement;

