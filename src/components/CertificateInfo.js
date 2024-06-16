import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, IconButton } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from '../logos/cannabis-background.webp'; // Замените на путь к вашему фоновому изображению
import BackImage from '../logos/back.webp'; // Замените на путь к изображению кнопки "Назад"

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Устанавливаем время задержки в 500 мс

    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    navigate('/profile');
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          {isLoaded && (
            <StyledBox elevation={3}>
              <Header>
                <IconButton onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
                  <img src={BackImage} alt="Back" style={{ width: '30px', height: '30px' }} />
                </IconButton>
                <Typography component="h1" variant="h5" sx={{ color: '#388e3c', flexGrow: 1, textAlign: 'center' }}>
                  Medicinal Cannabis Certificate
                </Typography>
                <div style={{ width: '30px', height: '30px' }}></div> {/* Пустое место для центрирования */}
              </Header>
              <Typography variant="body2" sx={{ textAlign: 'justify', color: '#000', fontSize: '0.875rem' }}>
                This certificate allows the use of all cannabinoids (THC or CBD) legally, including carrying them in public and exempting drivers from penalties if prescribed by a doctor.
                <br /><br />
                <b>Who is this for?</b>
                <br />
                People with certain pathologies who want to use Marijuana or CBD for treatment, enabling legal consumption without penalties.
                <br /><br />
                <b>Validity</b>
                <br />
                Valid in Schengen Area countries.
                <br /><br />
                <b>Requirements</b>
                <br />
                1. Qualifying pathology.
                <br />
                2. Valid DNI-NIE or Passport photo.
                <br />
                3. Attach all documentation when contracting the service.
                <br />
                *If no medical history, fill out a form in our Telegram bot.
                <br /><br />
                <b>Pathologies</b>
                <br />
                Alzheimer's, Anorexia, Anxiety, Asthma, Dependence, Depression, Chronic pain, Inflammatory diseases, Epilepsy, Fibromyalgia, Glaucoma, ADHD, Insomnia, Nausea, Skin problems, Tourette syndrome, Mixed syndromes, Psychiatric symptoms, Immune system, Hyperkinetic disorders
                <br /><br />
                <b>Renewal</b>
                <br />
                Annually, to ensure user safety.
                <br /><br />
                <b>Management</b>
                <br />
                Managed by the Cannabis Federation in alliance with the Therapeutic Cabinet, ensuring strict control of sensitive information in compliance with data privacy laws.
                <br /><br />
                <b>Additional Info</b>
                <br />
                The UN Single Convention on Narcotic Drugs (1961) allows medical and scientific use of narcotics. In Spain, the therapeutic use of Cannabis has been legal since 1967, though strictly regulated.
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={handleBackClick}>
                Назад к личному кабинету
              </Button>
            </StyledBox>
          )}
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default CertificateInfo;




