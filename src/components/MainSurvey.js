
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from '../logos/cannabis-background.jpeg';

const theme = createTheme();

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const MainSurvey = () => {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState({
    generalHealth: '',
    healthComparison: '',
    physicalActivities: {
      running: '',
      lifting: '',
      walking: '',
    },
    emotionalProblems: '',
    socialActivities: '',
    bodyPain: '',
    painInterference: '',
    energyLevels: '',
    happiness: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({ ...surveyData, [name]: value });
  };

  const handleSubmit = () => {
    // Обработка данных опросника и переход к оплате и выбору консультации
    navigate('/consultation');
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="sm">
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
              <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: 2 }}>
                Health Survey
              </Typography>
              <TextField
                select
                label="In general, would you say that your health is:"
                name="generalHealth"
                value={surveyData.generalHealth}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="excellent">Excellent</MenuItem>
                <MenuItem value="veryGood">Very good</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="fair">Fair</MenuItem>
                <MenuItem value="poor">Poor</MenuItem>
              </TextField>
              <TextField
                select
                label="Compared to one year ago, how would you rate your health in general now?"
                name="healthComparison"
                value={surveyData.healthComparison}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="muchBetterNow">Much better now than one year ago</MenuItem>
                <MenuItem value="somewhatBetterNow">Somewhat better now than one year ago</MenuItem>
                <MenuItem value="aboutTheSame">About the same</MenuItem>
                <MenuItem value="somewhatWorseNow">Somewhat worse now than one year ago</MenuItem>
                <MenuItem value="muchWorseNow">Much worse now than one year ago</MenuItem>
              </TextField>
              <TextField
                select
                label="Does your health now limit you in physical activities (e.g., running, lifting, walking)?"
                name="physicalActivities.running"
                value={surveyData.physicalActivities.running}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="veryLimited">Very limited</MenuItem>
                <MenuItem value="somewhatLimited">Somewhat limited</MenuItem>
                <MenuItem value="notLimited">Not limited</MenuItem>
              </TextField>
              <TextField
                select
                label="During the last 4 weeks, have you had any emotional problems (e.g., feeling depressed or anxious)?"
                name="emotionalProblems"
                value={surveyData.emotionalProblems}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
              <TextField
                select
                label="During the past 4 weeks, how much have your physical or emotional problems interfered with your social activities?"
                name="socialActivities"
                value={surveyData.socialActivities}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="allTheTime">All the time</MenuItem>
                <MenuItem value="mostOfTheTime">Most of the time</MenuItem>
                <MenuItem value="someOfTheTime">Some of the time</MenuItem>
                <MenuItem value="aLittleOfTheTime">A little of the time</MenuItem>
                <MenuItem value="noneOfTheTime">None of the time</MenuItem>
              </TextField>
              <TextField
                select
                label="How much body pain have you had in the last 4 weeks?"
                name="bodyPain"
                value={surveyData.bodyPain}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="veryMild">Very mild</MenuItem>
                <MenuItem value="mild">Mild</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="severe">Severe</MenuItem>
                <MenuItem value="verySevere">Very severe</MenuItem>
              </TextField>
              <TextField
                select
                label="During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?"
                name="painInterference"
                value={surveyData.painInterference}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="notAtAll">Not at all</MenuItem>
                <MenuItem value="aLittleBit">A little bit</MenuItem>
                <MenuItem value="moderately">Moderately</MenuItem>
                <MenuItem value="quiteABit">Quite a bit</MenuItem>
                <MenuItem value="extremely">Extremely</MenuItem>
              </TextField>
              <TextField
                select
                label="How much of the time during the last 4 weeks did you feel full of energy?"
                name="energyLevels"
                value={surveyData.energyLevels}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="allTheTime">All the time</MenuItem>
                <MenuItem value="mostOfTheTime">Most of the time</MenuItem>
                <MenuItem value="someOfTheTime">Some of the time</MenuItem>
                <MenuItem value="aLittleOfTheTime">A little of the time</MenuItem>
                <MenuItem value="noneOfTheTime">None of the time</MenuItem>
              </TextField>
              <TextField
                select
                label="During the past 4 weeks, how much of the time have you been a happy person?"
                name="happiness"
                value={surveyData.happiness}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="allTheTime">All the time</MenuItem>
                <MenuItem value="mostOfTheTime">Most of the time</MenuItem>
                <MenuItem value="someOfTheTime">Some of the time</MenuItem>
                <MenuItem value="aLittleOfTheTime">A little of the time</MenuItem>
                <MenuItem value="noneOfTheTime">None of the time</MenuItem>
              </TextField>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default MainSurvey;


