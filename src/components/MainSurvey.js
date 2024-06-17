import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, MenuItem, IconButton, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CannabisBackground from './cannabis-background.webp';

const theme = createTheme();

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

const ScrollablePaper = styled(Paper)({
  maxHeight: 'calc(100vh - 40px)',
  overflowY: 'auto',
  padding: 3,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

const MainSurvey = () => {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState({
    generalHealth: '',
    healthComparison: '',
    physicalActivities: {},
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

  const handlePhysicalActivityChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({
      ...surveyData,
      physicalActivities: {
        ...surveyData.physicalActivities,
        [name]: value,
      },
    });
  };

  const handleSubmit = () => {
    // Обработка данных опросника и переход к оплате и выбору консультации
    navigate('/consultation');
  };

  const handleBackClick = () => {
    navigate('/profile');
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <ScrollablePaper elevation={3}>
            <Header>
              <IconButton onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
                <ArrowBackIcon style={{ color: '#388e3c' }} />
              </IconButton>
              <Typography component="h1" variant="h5" sx={{ color: '#388e3c', flexGrow: 1, textAlign: 'center' }}>
                Health Survey
              </Typography>
              <div style={{ width: '30px', height: '30px' }}></div>
            </Header>
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
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
              <Typography variant="body1" sx={{ marginTop: 2, textAlign: 'left', width: '100%' }}>
                The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much? PLEASE CIRCLE THE NUMBER THAT BEST DESCRIBES YOUR ANSWER.
              </Typography>
              <Box sx={{ width: '100%', marginTop: 2 }}>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend">Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports.</FormLabel>
                  <RadioGroup
                    row
                    name="vigorousActivities"
                    value={surveyData.physicalActivities.vigorousActivities}
                    onChange={handlePhysicalActivityChange}
                  >
                    <FormControlLabel value="veryLimited" control={<Radio />} label="1 (Very limited)" />
                    <FormControlLabel value="somewhatLimited" control={<Radio />} label="2 (Somewhat limited)" />
                    <FormControlLabel value="notLimited" control={<Radio />} label="3 (Not limited)" />
                  </RadioGroup>
                  <FormLabel component="legend">Moderate activities, such as moving a table, pushing a vacuum, going bowling or playing golf.</FormLabel>
                  <RadioGroup
                    row
                    name="moderateActivities"
                    value={surveyData.physicalActivities.moderateActivities}
                    onChange={handlePhysicalActivityChange}
                  >
                    <FormControlLabel value="veryLimited" control={<Radio />} label="1 (Very limited)" />
                    <FormControlLabel value="somewhatLimited" control={<Radio />} label="2 (Somewhat limited)" />
                    <FormControlLabel value="notLimited" control={<Radio />} label="3 (Not limited)" />
                  </RadioGroup>
                  {/* Add other physical activities in similar way */}
                </FormControl>
              </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </Box>
          </ScrollablePaper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default MainSurvey;



