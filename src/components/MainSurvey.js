import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, Button, CssBaseline, Paper, Radio, FormControlLabel, RadioGroup, IconButton, Snackbar, Alert, TextField } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTranslation } from 'react-i18next';
import CannabisBackground from './cannabis-background.webp';
import LanguageSwitcher from './LanguageSwitcher';

const theme = createTheme();
const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});
const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
  paddingTop: '20px',
  paddingBottom: '20px',
});

const FullScreenPaper = styled(Paper)({
  maxHeight: 'calc(100vh - 40px)',
  overflowY: 'auto',
  padding: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  margin: '0 20px', 
  maxWidth: '1200px',
  position: 'relative',
});

const RoundedTypography = styled(Typography)({
  padding: '10px 15px',
  borderRadius: '25px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#388e3c',
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'left',
  width: '100%',
  marginBottom: '16px',
});

const RadioGroupRow = styled(RadioGroup)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  flexWrap: 'wrap',
  gap: '10px',
});

const MainSurvey = () => {
  const { t } = useTranslation();
  const [surveyData, setSurveyData] = useState({
    generalhealth: {},
    comparing: {},
    dayactivities: {},
    physicalhealth: {},
    depressed: {},
    socialactivitiesgroups: {},
    bodypain: {},
    paininterfere: {},
    feelings: {},
    socialInterference: {},
    healthTime: {},
    firstName: "", // Добавлено поле для имени
    lastName: "", // Добавлено поле для фамилии
    pathology: "", // Добавлено поле для патологии
    telegramId: "", // Добавлено поле для telegramId
    documentType: "Passport"
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const paperRef = useRef(null);

  useEffect(() => {
    const telegramUser = JSON.parse(localStorage.getItem('telegramUser'));
    if (telegramUser && telegramUser.id) {
      setSurveyData(prevData => ({
        ...prevData,
        telegramId: telegramUser.id
      }));
    } else {
      console.error('Ошибка: telegramUser не найден в localStorage');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const category = name.match(/[a-zA-Z]+/)[0]; // Извлекаем категорию из имени
    const index = name.match(/\d+/) ? name.match(/\d+/)[0] : null; // Извлекаем индекс из имени, если есть

    if (index !== null) {
      setSurveyData((prevData) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [index]: value,
        },
      }));
    } else {
      setSurveyData((prevData) => ({
        ...prevData,
        [category]: value,
      }));
    }
  };

  const validateSurveyData = () => {
    const requiredCategories = [
      'generalhealth',
      'comparing',
      'dayactivities',
      'physicalhealth',
      'depressed',
      'socialactivitiesgroups',
      'bodypain',
      'paininterfere',
      'feelings',
      'socialInterference',
      'healthTime'
    ];

    for (const category of requiredCategories) {
      const categoryData = surveyData[category];
      for (const key in categoryData) {
        if (!categoryData[key]) {
          return false;
        }
      }
    }
    return surveyData.firstName && surveyData.lastName && surveyData.pathology !== "";
  };

  const handleSubmit = async () => {
    if (!validateSurveyData()) {
      setErrorMessage(t('Please fill out all fields.'));
      return;
    }
    try {
      console.log('Submitting survey data:', surveyData); // Логирование данных перед отправкой
      await axios.post('/api/surveys/save', surveyData);
      navigate('/document-upload');
    } catch (error) {
      console.error('Error saving survey data:', error);
      setErrorMessage(error.response ? error.response.data.details : 'An unknown error occurred');
    }
  };

  const handleBackClick = () => {
    navigate('/profile');
  };

  const handleScrollToTop = () => {
    if (paperRef.current) {
      paperRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <FullScreenPaper elevation={3} ref={paperRef}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Header>
                <IconButton onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
                  <ArrowBackIcon style={{ color: '#388e3c' }} />
                </IconButton>
                <Typography component="h1" variant="h5" sx={{ color: '#388e3c', flexGrow: 1, textAlign: 'center' }}>
                  {t('Health Survey')}
                </Typography>
                <LanguageSwitcher />
              </Header>
              <TextField
                name="firstName"
                label={t("First Name")}
                fullWidth
                value={surveyData.firstName}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                name="lastName"
                label={t("Last Name")}
                fullWidth
                value={surveyData.lastName}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                name="pathology"
                label={t("Pathology")}
                fullWidth
                value={surveyData.pathology}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('IN GENERAL, WOULD YOU SAY THAT YOUR HEALTH IS:')}
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="generalhealth0"
                  value={surveyData.generalhealth[0] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label={t("Excellent")} />
                  <FormControlLabel value="2" control={<Radio />} label={t("Very good")} />
                  <FormControlLabel value="3" control={<Radio />} label={t("Good")} />
                  <FormControlLabel value="4" control={<Radio />} label={t("Fair")} />
                  <FormControlLabel value="5" control={<Radio />} label={t("Poor")} />
                </RadioGroupRow>
              </Box>
                    
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('COMPARING IT WITH THE ONE OF A YEAR AGO:')}
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="comparing0"
                  value={surveyData.comparing[0] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label={t("Much better now than a year ago")} />
                  <FormControlLabel value="2" control={<Radio />} label={t("Somewhat worse now than a year ago ")} />
                  <FormControlLabel value="3" control={<Radio />} label={t("Same as a year ago")} />
                  <FormControlLabel value="4" control={<Radio />} label={t("Much worse now than a year ago")} />
                </RadioGroupRow>
              </Box>
                    
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?')}
              </RoundedTypography>
              {[
                t('Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports.'),
                t('Moderate activities, such as moving a table, pushing a vacuum, go bowling or play golf.'),
                t('Lifting weight or carrying food.'),
                t('Climb several flights of stairs.'),
                t('Up a flight of stairs.'),
                t('Bend, kneel, or stoop.'),
                t('Walking more than a kilometer.'),
                t('Walking several blocks.'),
                t('Walking one block.'),
                t('Bathing or dressing.'),
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={'dayactivities${index}'}
                    value={surveyData.dayactivities[index] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label={t("Yes very limited")} />
                    <FormControlLabel value="2" control={<Radio />} label={t("Yes a bit limited")} />
                    <FormControlLabel value="3" control={<Radio />} label={t("No, nothing limited")} />
                  </RadioGroupRow>
                </Box>
              ))}
                
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('During the last 4 weeks, have you had any of the following problems with your work or other normal daily activities as a result of your physical health?')}
              </RoundedTypography>
              {[
                t('I have reduced the time I spend at work or other activities'),
                t('I have accomplished less than I would like'),
                t('I had some limitation in work or other activities'),
                t('I had difficulty and required an extra effort'),
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={'physicalhealth${index}'}
                    value={surveyData.physicalhealth[index] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label={t("Yes")} />
                    <FormControlLabel value="2" control={<Radio />} label={t("No")} />
                  </RadioGroupRow>
                </Box>
              ))}
                
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('During the last 4 weeks, have you had any of the following problems at work or with other usual daily activities as a result of an emotional problem (such as feeling depressed or anxious)?')}
              </RoundedTypography>
              {[
                t('I have reduced the amount of time I spend at work or doing other activities.'),
                t('I have accomplished less than I would like.'),
                t('I did not do work or other activities as carefully as usual.')
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={'depressed${index}'}
                    value={surveyData.depressed[index] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label={t("Yes")} />
                    <FormControlLabel value="2" control={<Radio />} label={t("No")} />
                  </RadioGroupRow>
                </Box>
              ))}

              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('During the past 4 weeks, to what extent have your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?')}
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="socialactivitiesgroups0"
                  value={surveyData.socialactivitiesgroups[0] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label={t("No way.")} />
                  <FormControlLabel value="2" control={<Radio />} label={t("Slightly.")} />
                  <FormControlLabel value="3" control={<Radio />} label={t("Moderately.")} />
                  <FormControlLabel value="4" control={<Radio />} label={t("Quite.")} />
                  <FormControlLabel value="5" control={<Radio />} label={t("Extremely.")} />
                </RadioGroupRow>
              </Box>

              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('How much body pain have you had in the last 4 weeks?')}
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="bodypain0"
                  value={surveyData.bodypain[0] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label={t("Nothing")} />
                  <FormControlLabel value="2" control={<Radio />} label={t("Very soft.")} />
                  <FormControlLabel value="3" control={<Radio />} label={t("Soft.")} />
                  <FormControlLabel value="4" control={<Radio />} label={t("Moderate.")} />
                  <FormControlLabel value="5" control={<Radio />} label={t("Severe.")} />
                  <FormControlLabel value="6" control={<Radio />} label={t("Very severe.")} />
                </RadioGroupRow>
              </Box>
              
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?')}
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="paininterfere0"
                  value={surveyData.paininterfere[0] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label={t("No way.")} />
                  <FormControlLabel value="2" control={<Radio />} label={t("Slightly.")} />
                  <FormControlLabel value="3" control={<Radio />} label={t("Moderately.")} />
                  <FormControlLabel value="4" control={<Radio />} label={t("Quite.")} />
                  <FormControlLabel value="5" control={<Radio />} label={t("Extremely.")} />
                </RadioGroupRow>
              </Box>
                    
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('These questions are about how you are feeling and how things have been going for you in the last 4 weeks. For each question, please give the answer that is closest to how you felt.')}
              </RoundedTypography>
              {[
                t('Did you feel full of energy?'),
                t('Were you very nervous?'),
                t('Have you felt so low that nothing could cheer you up?'),
                t('Have you felt calm and at peace?'),
                t('Did you have a lot of energy?'),
                t('Have you felt downhearted and blue?'),
                t('Did you feel exhausted?'),
                t('Have you been a happy person?'),
                t('Did you feel tired?'),
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={'feelings${index}'}
                    value={surveyData.feelings[index] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label={t("All the time")} />
                    <FormControlLabel value="2" control={<Radio />} label={t("Most of the time")} />
                    <FormControlLabel value="3" control={<Radio />} label={t("Good part of the time")} />
                    <FormControlLabel value="4" control={<Radio />} label={t("Part of the time")} />
                    <FormControlLabel value="5" control={<Radio />} label={t("A small part of the time")} />
                    <FormControlLabel value="6" control={<Radio />} label={t("No time")} />
                  </RadioGroupRow>
                </Box>
              ))}
                
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?')}
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="socialInterference0"
                  value={surveyData.socialInterference[0] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label={t("All the time.")} />
                  <FormControlLabel value="2" control={<Radio />} label={t("Most of the time.")} />
                  <FormControlLabel value="3" control={<Radio />} label={t("Part of the time.")} />
                  <FormControlLabel value="4" control={<Radio />} label={t("A little of the time.")} />
                  <FormControlLabel value="5" control={<Radio />} label={t("None of the time.")} />
                </RadioGroupRow>
              </Box>
                    
              <RoundedTypography sx={{ marginTop: 2 }}>
                {t('How much of the time during the last 4 weeks?')}
              </RoundedTypography>
              {[
                t('I seem to get sick a little more than other people.'),
                t('I am as healthy as anyone you know.'),
                t('I hope my health gets worse.'),
                t('My health is excellent.'),
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2, width: '100%', }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={'healthTime${index}'}
                    value={surveyData.healthTime[index] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label={t("Definitely right")} />
                    <FormControlLabel value="2" control={<Radio />} label={t("Mostly true")} />
                    <FormControlLabel value="3" control={<Radio />} label={t("Don't know")} />
                    <FormControlLabel value="4" control={<Radio />} label={t("Mostly false")} />
                    <FormControlLabel value="5" control={<Radio />} label={t("Definitely false")} />
                  </RadioGroupRow>
                </Box>
              ))}
                
              <IconButton
                sx={{ position: 'fixed', bottom: 30, right: 40, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleScrollToTop}
              >
                <ArrowUpwardIcon />
              </IconButton>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleSubmit}
              >
                {t('Continue')}
              </Button>
          </Box>
      </FullScreenPaper>
    </Container>
    {errorMessage && (
      <Snackbar open={true} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    )}
  </Background>
</ThemeProvider>
);
};

export default MainSurvey;
