import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, Radio, FormControlLabel, RadioGroup, IconButton } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  margin: '0 10px',
  maxWidth: '100%',
});

const MainSurvey = () => {
  const [surveyData, setSurveyData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({ ...surveyData, [name]: value });
  };

  const handleSubmit = () => {
    navigate('/consultation');
  };

  const handleBackClick = () => {
    navigate('/profile');
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <FullScreenPaper elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Header>
                <IconButton onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
                  <ArrowBackIcon style={{ color: '#388e3c' }} />
                </IconButton>
                <Typography component="h1" variant="h5" sx={{ color: '#388e3c', flexGrow: 1, textAlign: 'center' }}>
                  Health Survey
                </Typography>
                <div style={{ width: '30px', height: '30px' }}></div>
              </Header>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                IN GENERAL, WOULD YOU SAY THAT YOUR HEALTH IS
              </Typography>
              {[
                'Excellent',
                'Very good',
                'Good',
                'Fair',
                'Poor',
              ].map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={<Radio
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                    value={option}
                    name="generalHealth"
                    checked={surveyData.generalHealth === option}
                    onChange={handleInputChange}
                  />}
                  label={option}
                />
              ))}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                COMPARING IT WITH THE ONE OF A YEAR AGO
              </Typography>
              {[
                'Much better now than a year ago',
                'Somewhat worse now than a year ago',
                'Same as a year ago',
                'Much worse now than a year ago',
              ].map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={<Radio
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                    value={option}
                    name="healthComparison"
                    checked={surveyData.healthComparison === option}
                    onChange={handleInputChange}
                  />}
                  label={option}
                />
              ))}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?
              </Typography>
              {[
                'Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports.',
                'Moderate activities, such as moving a table, pushing a vacuum, go bowling or play golf.',
                'Lifting weight or carrying food.',
                'Climb several flights of stairs.',
                'Up a flight of stairs.',
                'Bend, kneel, or stoop.',
                'Walking more than a kilometer.',
                'Walking several blocks.',
                'Walking one block.',
                'Bathing or dressing.',
              ].map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2">{activity}</Typography>
                  <RadioGroup
                    row
                    name={`dayActivity${index}`}
                    value={surveyData[`dayActivity${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="veryLimited" control={<Radio />} label="Yes very limited" />
                    <FormControlLabel value="bitLimited" control={<Radio />} label="Yes a bit limited" />
                    <FormControlLabel value="notLimited" control={<Radio />} label="No, nothing limited" />
                  </RadioGroup>
                </Box>
              ))}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the last 4 weeks, have you had any of the following problems with your work or other normal daily activities as a result of your physical health?
              </Typography>
              {[
                'I have reduced the time I spend at work or other activities',
                'I have accomplished less than I would like',
                'I had some limitation in work or other activities',
                'I had difficulty and required an extra effort',
              ].map((problem, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2">{problem}</Typography>
                  <RadioGroup
                    row
                    name={`physicalHealthProblem${index}`}
                    value={surveyData[`physicalHealthProblem${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              ))}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the last 4 weeks, have you had any of the following problems at work or with other usual daily activities as a result of an emotional problem (such as feeling depressed or anxious)?
              </Typography>
              {[
                'I have reduced the amount of time I spend at work or doing other activities',
                'I have accomplished less than I would like',
                'I did not do work or other activities as carefully as usual',
              ].map((problem, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2">{problem}</Typography>
                  <RadioGroup
                    row
                    name={`emotionalProblem${index}`}
                    value={surveyData[`emotionalProblem${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
              ))}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the past 4 weeks, to what extent have your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?
              </Typography>
              {[
                'No way.',
                'Slightly.',
                'Moderately.',
                'Quite.',
                'Extremely.',
              ].map((extent, index) => (
                <FormControlLabel
                  key={index}
                  control={<Radio
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                    value={extent}
                    name="socialInterference"
                    checked={surveyData.socialInterference === extent}
                    onChange={handleInputChange}
                  />}
                  label={extent}
                />
              ))}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
  How much body pain have you had in the last 4 weeks?
</Typography>
{[
  'Nothing',
  'Very soft.',
  'Soft.',
  'Moderate.',
  'Severe.',
  'Very severe',
].map((pain, index) => (
  <FormControlLabel
    key={index}
    control={<Radio
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
      value={pain}
      name="bodyPain"
      checked={surveyData.bodyPain === pain}
      onChange={handleInputChange}
    />}
    label={pain}
  />
))}
<Typography variant="body1" sx={{ marginTop: 2 }}>
  During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?
</Typography>
{[
  'No way.',
  'Slightly.',
  'Moderately.',
  'Quite.',
  'Extremely.',
].map((interference, index) => (
  <FormControlLabel
    key={index}
    control={<Radio
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
      value={interference}
      name="painInterference"
      checked={surveyData.painInterference === interference}
      onChange={handleInputChange}
    />}
    label={interference}
  />
))}
<Typography variant="body1" sx={{ marginTop: 2 }}>
  These questions are about how you are feeling and how things have been going for you in the last 4 weeks. For each question, please give the answer that is closest to how you felt.
</Typography>
{[
  'Did you feel full of energy?',
  'Were you very nervous?',
  'Have you felt so low that nothing could cheer you up?',
  'Have you felt calm and at peace?',
  'Did you have a lot of energy?',
  'Have you felt downhearted and blue?',
  'Did you feel exhausted?',
  'Have you been a happy person?',
  'Did you feel tired?',
].map((question, index) => (
  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
    <Typography variant="body2">{question}</Typography>
    <RadioGroup
      row
      name={`feeling${index}`}
      value={surveyData[`feeling${index}`] || ''}
      onChange={handleInputChange}
    >
      <FormControlLabel value="allTheTime" control={<Radio />} label="All the time" />
      <FormControlLabel value="mostOfTheTime" control={<Radio />} label="Most of the time" />
      <FormControlLabel value="goodPartOfTheTime" control={<Radio />} label="Good part of the time" />
      <FormControlLabel value="partOfTheTime" control={<Radio />} label="Part of the time" />
      <FormControlLabel value="smallPartOfTheTime" control={<Radio />} label="A small part of the time" />
      <FormControlLabel value="noTime" control={<Radio />} label="No time" />
    </RadioGroup>
  </Box>
))}
<Typography variant="body1" sx={{ marginTop: 2 }}>
  During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?
</Typography>
{[
  'All the time.',
  'Most of the time.',
  'Part of the time.',
  'A little of the time.',
  'None of the time.',
].map((interference, index) => (
  <FormControlLabel
    key={index}
    control={<Radio
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
      value={interference}
      name="socialInterferenceTime"
      checked={surveyData.socialInterferenceTime === interference}
      onChange={handleInputChange}
    />}
    label={interference}
  />
))}
<Typography variant="body1" sx={{ marginTop: 2 }}>
  How much of the time during the last 4 weeks?
</Typography>
{[
  'I seem to get sick a little more than other people.',
  'I am as healthy as anyone you know.',
  'I hope my health gets worse.',
  'My health is excellent.',
].map((statement, index) => (
  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
    <Typography variant="body2">{statement}</Typography>
    <RadioGroup
      row
      name={`healthStatement${index}`}
      value={surveyData[`healthStatement${index}`] || ''}
      onChange={handleInputChange}
    >
      <FormControlLabel value="definitelyRight" control={<Radio />} label="Definitely right" />
      <FormControlLabel value="mostlyTrue" control={<Radio />} label="Mostly true" />
      <FormControlLabel value="dontKnow" control={<Radio />} label="Don't know" />
      <FormControlLabel value="mostlyFalse" control={<Radio />} label="Mostly false" />
      <FormControlLabel value="definitelyFalse" control={<Radio />} label="Definitely false" />
    </RadioGroup>
  </Box>
))}
<Button
  fullWidth
  variant="contained"
  sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
  onClick={handleSubmit}
>
  Continue
</Button>
</Box>
</FullScreenPaper>
</Container>
</Background>
</ThemeProvider>
);
};

export default MainSurvey;
