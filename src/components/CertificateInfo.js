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
                With the Medicinal Cannabis certificate you will also have the option of treating yourself with all cannabinoids. In this way, you will not have problems with the use of Cannabis (THC or CBD), even in minimal quantities because your consumption will be low “optional prescription”. In addition, you will also have a medical recommendation that will establish the treatment regimen and you will be able to bring the CANNABIS or CBD on top for the public roads without being sanctioned or fined.
                <br /><br />
                Besides, if you drive you will be exempt from paying the penalty of the drug test since last year the Constitutional Court endorsed them, except in cases where a doctor has “prescribed” it and does not influence the ability to drive.
                <br /><br />
                Therefore, if you want to take a plane and take your medication outside of Spanish territory, you will need to have the medical recommendation printed along with a certificate of Therapeutic use. It is super important to have the certificate renewed annually since it also includes the date of issue.
                <br /><br />
                <b>Who is this service aimed at?</b>
                <br />
                The Medicinal Cannabis Certificate is aimed at all those people who have a pathology and want to remedy it with the benefits of Marijuana or CBD, in this way, the medicine can be freely consumed without being judged or penalized by the justice system.
                <br /><br />
                <b>Where can I use the Medicinal Certificate of Cannabis?</b>
                <br />
                The Medicinal certificate of Cannabis will be sealed and signed by the doctor and is valid in the countries of the Schengen agreement.
                <br /><br />
                <b>And what is the SCHENGEN agreement?</b>
                <br />
                Consequently, it is an agreement which was signed in Luxembourg City (Schengen) in 1985 and came into force in 1995. It says: several countries in the European Union abolished controls at internal borders and transferred these controls to external borders.
                <br /><br />
                In this way, establish a common space “called the SCHENGEN area” that covers a large part of the European continent. These countries apply common rules to control external borders and also regarding visas and cooperation between police and judicial services.
                <br /><br />
                <b>Countries that are integrated into the SCHENGEN AREA:</b>
                <br />
                GERMANY, AUSTRIA, BELGIUM, SWEDEN, SLOVENIA, SPAIN, FRANCE, LATVIA, ESTONIA, FINLAND, ITALY, ICELAND, HUNGARY, GREECE, SWEDEN, REP. SLOVAK, REP. CZECH, PORTUGAL, POLAND, NETHERLANDS, NORWAY, MALT, LUXEMBOURG, LITHUANIA, LIECHTENSTEIN, DENMARK
                <br /><br />
                <b>Requirements to obtain the Medicinal Certificate of Cannabis:</b>
                <br />
                First of all, it will be essential to have one of the following pathologies named below, in this way, An online medical visit will be obtained and you will obtain your Certificate.
                <br /><br />
                Secondly, photo of the valid DNI-NIE or Passport.
                <br /><br />
                Finally, all this documentation must be attached at the time of contracting the service.
                <br /><br />
                <i>IF YOU DO NOT HAVE ANY MEDICAL HISTORY YOU MUST FILL OUT A FORM IN OUR TELEGRAM BOT</i>
                <br /><br />
                <b>PATHOLOGIES:</b>
                <br />
                Alzheimer's, Anorexia and cachexia, Anxiety, Asthma, Dependence, Depression, Chronic pain, Inflammatory diseases, Epilepsy, Fibromyalgia, Glaucoma, Hyperactivity/ADHD, Insomnia, Nausea and vomiting, Skin problems, Tourette syndrome, Mixed syndromes, Psychiatric symptoms, Immune system, Hyperkinetic disorders
                <br /><br />
                <b>How often is the certificate renewed?</b>
                <br />
                The therapeutic use certificate is renewed with at least an annual follow-up visit. This ensures the safety of users.
                <br /><br />
                <b>Who manages the medicinal cannabis certificate?</b>
                <br />
                Cannabis Federation has an alliance with the Therapeutic Cabinet which is made up of a general practitioner specialized in cannabinoid medicine and a neuropsychologist. We also have the help of a Data Protection Officer who helps us in the preparation of the files, always under the strictest control of the information, particularly sensitive, under the strictest REQUIREMENTS OF LAWS ON PRIVACY AND PROTECTION OF PERSONAL DATA.
                <br /><br />
                <b>Additional Information:</b>
                <br />
                The UN Single Convention on Narcotic Drugs signed in 1961 recommends the prohibition of cannabis, although it also contemplates "the production, manufacture, importation, use and possession of narcotics for medical and scientific purposes."
                <br /><br />
                In Spain the therapeutic use of Cannabis is already LEGAL, since 1967. The problem is that there is only one medicine, and the use is under strict health control. GW Pharma's pharmaceutical product is marketed by the Almirall Laboratory. It costs the public coffers €450 per unit and is accepted only for patients with multiple sclerosis, specifically for one of the symptoms, which are spasms in the arms and legs.
                <br /><br />
                The medical uses indicated with Cannabis, which are a fundamental requirement to take into account especially when requesting the CERTIFICATE CANNABIS MEDICINAL. This service includes the certificate of therapeutic use and the medical recommendation to carry out supervised therapeutic use with flowers and products derived from the Cannabis plant.
                <br /><br />
                <b>OUTSTANDING:</b>
                <br />
                Medicinal plants have the status of active ingredient when they can demonstrate a therapeutic indication, they are then considered just another medicine. Royal Legislative Decree 1/2015.
                <br /><br />
                Certainly, each Marijuana plant contains a cocktail of cannabinoids. As a result, a package of effects with a unique therapeutic formula of which at the moment we know few of its main components, CBD and THC, of the approximately 180 different cannabinoids found in the entire plant.
                <br /><br />
                However, the Cannabis plant, not being a medicine, is a difficult substance to control; For this reason, for many patients, medical supervision is necessary with the aim of learning and self-management of their disease.
                <br /><br />
                So, you are about to be a Medical Cannabis user!
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

