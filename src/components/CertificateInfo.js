import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from '../logos/cannabis-background.jpeg'; // Замените на путь к вашему фоновому изображению

const theme = createTheme();

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const CertificateInfo = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/profile');
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: 2 }}>
                What is the Medicinal Certificate of Cannabis?
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'justify', color: '#000' }}>
                The Medicinal Cannabis certificate allows the use of all cannabinoids (THC or CBD) without legal issues, including carrying them in public and exempting drivers from penalties if prescribed by a doctor.
                <br /><br />
                <b>Who is this service aimed at?</b>
                <br />
                It is for people with certain pathologies who wish to use Marijuana or CBD for treatment, enabling legal consumption without judgment or penalties.
                <br /><br />
                <b>Where can I use the Medicinal Certificate of Cannabis?</b>
                <br />
                The certificate is valid in Schengen Area countries.
                <br /><br />
                <b>Requirements to obtain the Medicinal Certificate of Cannabis:</b>
                <br />
                1. Have a qualifying pathology.
                <br />
                2. Provide a photo of valid DNI-NIE or Passport.
                <br />
                3. Attach all documentation when contracting the service.
                <br />
                *If no medical history, fill out a form in our Telegram bot.
                <br /><br />
                <b>Pathologies:</b>
                <br />
                Alzheimer's, Anorexia, Anxiety, Asthma, Dependence, Depression, Chronic pain, Inflammatory diseases, Epilepsy, Fibromyalgia, Glaucoma, ADHD, Insomnia, Nausea, Skin problems, Tourette syndrome, Mixed syndromes, Psychiatric symptoms, Immune system, Hyperkinetic disorders
                <br /><br />
                <b>How often is the certificate renewed?</b>
                <br />
                Annually, to ensure user safety.
                <br /><br />
                <b>Who manages the medicinal cannabis certificate?</b>
                <br />
                The Cannabis Federation, in alliance with the Therapeutic Cabinet, which includes a doctor and a neuropsychologist, manages the certificate. They ensure strict control of sensitive information in compliance with data privacy laws.
                <br /><br />
                <b>Additional Information:</b>
                <br />
                The UN Single Convention on Narcotic Drugs (1961) allows the medical and scientific use of narcotics. In Spain, the therapeutic use of Cannabis has been legal since 1967, though strictly regulated.
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={handleBackClick}>
                Назад к личному кабинету
              </Button>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default CertificateInfo;


