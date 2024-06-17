import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, MenuItem, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
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
  padding: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

const MainSurvey = () => {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState({
    generalHealth: '',
    healthComparison: '',
    physicalActivities: {
      vigorous: '',
      moderate: '',
      lifting: '',
      stairsSeveral: '',
      stairsOne: '',
      bending: '',
      walkingKilometer: '',
      walkingSeveral: '',
      walkingOne: '',
      bathing: ''
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

  const handlePhysicalActivityChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({ ...surveyData, physicalActivities: { ...surveyData.physicalActivities, [name]: value } });
  };

  const handleSubmit = () => {
    navigate('/consultation');
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <ScrollablePaper elevation={3}>
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
              <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?
              </Typography>
              <Typography sx={{ mt: 1, mb: 2, textAlign: 'center' }}>
                PLEASE SELECT THE OPTION THAT BEST DESCRIBES YOUR ANSWER.
              </Typography>
              <FormControl component="fieldset">
                {[
                  { name: 'vigorous', label: 'Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports' },
                  { name: 'moderate', label: 'Moderate activities, such as moving a table, pushing a vacuum, go bowling or play golf' },
                  { name: 'lifting', label: 'Lifting weight or carrying food' },
                  { name: 'stairsSeveral', label: 'Climb several flights of stairs' },
                  { name: 'stairsOne', label: 'Up a flight of stairs' },
                  { name: 'bending', label: 'Bend, kneel, or stoop' },
                  { name: 'walkingKilometer', label: 'Walking more than a kilometer' },
                  { name: 'walkingSeveral', label: 'Walking several blocks' },
                  { name: 'walkingOne', label: 'Walking one block' },
                  { name: 'bathing', label: 'Bathing or dressing' }
                ].map((activity) => (
                  <Box key={activity.name} sx={{ mb: 2 }}>
                    <Typography>{activity.label}</Typography>
                    <RadioGroup
                      row
                      aria-label={activity.name}
                      name={activity.name}
                      value={surveyData.physicalActivities[activity.name]}
                      onChange={handlePhysicalActivityChange}
                    >
                      <FormControlLabel value="veryLimited" control={<Radio />} label="Yes, very limited" />
                      <FormControlLabel value="bitLimited" control={<Radio />} label="Yes, a bit limited" />
                      <FormControlLabel value="notLimited" control={<Radio />} label="No, nothing limited" />
                    </RadioGroup>
                  </Box>
                ))}
              </FormControl>
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
