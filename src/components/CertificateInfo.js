import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, IconButton } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Используем иконку из MUI
import CannabisBackground from './cannabis-background.webp'; // Замените на путь к вашему фоновому изображению
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const theme = createTheme();

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const StyledBox = styled(Box)({
  padding: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  marginTop: '24px', // Отступ сверху
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

const CertificateInfo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackClick = () => {
    navigate('/profile');
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <StyledBox elevation={3}>
            <Header>
              <IconButton onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
                <ArrowBackIcon style={{ color: '#388e3c' }} />
              </IconButton>
              <Typography component="h1" variant="h5" sx={{ color: '#388e3c', flexGrow: 1, textAlign: 'center' }}>
                {t('Medicinal Cannabis Certificate')}
              </Typography>
              <LanguageSwitcher />
            </Header>
            <Typography variant="body2" sx={{ textAlign: 'justify', color: '#000', fontSize: '0.875rem' }}>
              {t('This certificate allows the use of all cannabinoids (THC or CBD) legally, including carrying them in public and exempting drivers from penalties if prescribed by a doctor.')}
              <br /><br />
              <b>{t('Who is this for?')}</b>
              <br />
              {t('People with certain pathologies who want to use Marijuana or CBD for treatment, enabling legal consumption without penalties.')}
              <br /><br />
              <b>{t('Validity')}</b>
              <br />
              {t('Valid in Schengen Area countries.')}
              <br /><br />
              <b>{t('Requirements')}</b>
              <br />
              {t('1. Qualifying pathology.')}
              <br />
              {t('2. Valid DNI-NIE or Passport photo.')}
              <br />
              {t('3. Attach all documentation when contracting the service.')}
              <br />
              {t('*If no medical history, fill out a form in our Telegram bot.')}
              <br /><br />
              <b>{t('Pathologies')}</b>
              <br />
              {t('Alzheimer\'s, Anorexia, Anxiety, Asthma, Dependence, Depression, Chronic pain, Inflammatory diseases, Epilepsy, Fibromyalgia, Glaucoma, ADHD, Insomnia, Nausea, Skin problems, Tourette syndrome, Mixed syndromes, Psychiatric symptoms, Immune system, Hyperkinetic disorders')}
              <br /><br />
              <b>{t('Renewal')}</b>
              <br />
              {t('Annually, to ensure user safety.')}
              <br /><br />
              <b>{t('Management')}</b>
              <br />
              {t('Managed by the Cannabis Federation in alliance with the Therapeutic Cabinet, ensuring strict control of sensitive information in compliance with data privacy laws.')}
              <br /><br />
              <b>{t('Additional Info')}</b>
              <br />
              {t('The UN Single Convention on Narcotic Drugs (1961) allows medical and scientific use of narcotics. In Spain, the therapeutic use of Cannabis has been legal since 1967, though strictly regulated.')}
            </Typography>
          </StyledBox>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default CertificateInfo;




