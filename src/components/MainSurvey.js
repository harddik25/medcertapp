import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, FormControlLabel, Radio } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const theme = createTheme();

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
  paddingTop: '20px', // Добавляем отступ сверху
  paddingBottom: '20px', // Добавляем отступ снизу
});

const FullScreenPaper = styled(Paper)({
  width: '90%',
  maxWidth: '1200px',
  height: '90%',
  overflowY: 'auto',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

const TableHeader = styled(TableCell)({
  fontWeight: 'bold',
  fontSize: '0.8rem',
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
          <FullScreenPaper elevation={3}>
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: 2, fontSize: '1.2rem' }}>
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
                sx={{ fontSize: '0.8rem' }}
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
                sx={{ fontSize: '0.8rem' }}
              >
                <MenuItem value="muchBetterNow">Much better now than one year ago</MenuItem>
                <MenuItem value="somewhatBetterNow">Somewhat better now than one year ago</MenuItem>
                <MenuItem value="aboutTheSame">About the same</MenuItem>
                <MenuItem value="somewhatWorseNow">Somewhat worse now than one year ago</MenuItem>
                <MenuItem value="muchWorseNow">Much worse now than one year ago</MenuItem>
              </TextField>
              <Typography variant="body1" sx={{ marginTop: 2, fontSize: '0.8rem' }}>
                The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?
              </Typography>
              <Table size="small" sx={{ fontSize: '0.8rem' }}>
                <TableHead>
                  <TableRow>
                    <TableHeader>Activities</TableHeader>
                    <TableHeader>Yes, Limited a lot</TableHeader>
                    <TableHeader>Yes, Limited a little</TableHeader>
                    <TableHeader>No, Not limited at all</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {['Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports.', 'Moderate activities, such as moving a table, pushing a vacuum cleaner, bowling, or playing golf.', 'Lifting or carrying groceries.', 'Climbing several flights of stairs.', 'Climbing one flight of stairs.', 'Bending, kneeling, or stooping.', 'Walking more than a mile.', 'Walking several hundred yards.', 'Walking one hundred yards.', 'Bathing or dressing yourself.'].map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{activity}</TableCell>
                      {[1, 2, 3].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                              value={answer}
                              name={`activity${index}`}
                              checked={surveyData[`activity${index}`] === answer.toString()}
                              onChange={handleInputChange}
                              sx={{ fontSize: '0.8rem' }}
                            />}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2, fontSize: '0.8rem' }}>
                During the last 4 weeks, have you had any of the following problems with your work or other usual daily activities as a result of an emotional problem (such as feeling depressed or anxious)?
              </Typography>
              <Table size="small" sx={{ fontSize: '0.8rem' }}>
                <TableHead>
                  <TableRow>
                    <TableHeader>Problems</TableHeader>
                    <TableHeader>All of the time</TableHeader>
                    <TableHeader>Most of the time</TableHeader>
                    <TableHeader>Some of the time</TableHeader>
                    <TableHeader>A little of the time</TableHeader>
                    <TableHeader>None of the time</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {['Cut down the amount of time you spent on work or other activities.', 'Accomplished less than you would like.', 'Did work or other activities less carefully than usual.'].map((problem, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{problem}</TableCell>
                      {[1, 2, 3, 4, 5].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                              value={answer}
                              name={`problem${index}`}
                              checked={surveyData[`problem${index}`] === answer.toString()}
                              onChange={handleInputChange}
                              sx={{ fontSize: '0.8rem' }}
                            />}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2, fontSize: '0.8rem' }}>
  During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?
  PLEASE CIRCLE THE NUMBER THAT BEST DESCRIBES YOUR ANSWER.
</Typography>
<Table size="small" sx={{ fontSize: '0.8rem' }}>
  <TableHead>
    <TableRow>
      <TableHeader>Interference</TableHeader>
      <TableHeader>All of the time</TableHeader>
      <TableHeader>Most of the time</TableHeader>
      <TableHeader>Some of the time</TableHeader>
      <TableHeader>A little of the time</TableHeader>
      <TableHeader>None of the time</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {['Physical health problems', 'Emotional problems'].map((interference, index) => (
      <TableRow key={index}>
        <TableCell sx={{ fontSize: '0.8rem' }}>{interference}</TableCell>
        {[1, 2, 3, 4, 5].map((answer) => (
          <TableCell key={answer}>
            <FormControlLabel
              control={<Radio
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                value={answer}
                name={`interference${index}`}
                checked={surveyData[`interference${index}`] === answer.toString()}
                onChange={handleInputChange}
                sx={{ fontSize: '0.8rem' }}
              />}
            />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>
<Typography variant="body1" sx={{ marginTop: 2, fontSize: '0.8rem' }}>
  How much of the time during the last 4 weeks?
  PLEASE CIRCLE THE NUMBER THAT BEST DESCRIBES YOUR ANSWER.
</Typography>
<Table size="small" sx={{ fontSize: '0.8rem' }}>
  <TableHead>
    <TableRow>
      <TableHeader>Question</TableHeader>
      <TableHeader>All of the time</TableHeader>
      <TableHeader>Most of the time</TableHeader>
      <TableHeader>Some of the time</TableHeader>
      <TableHeader>A little of the time</TableHeader>
      <TableHeader>None of the time</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {['Did you feel full of energy?', 'Have you felt so down in the dumps that nothing could cheer you up?', 'Have you been a happy person?', 'Have you felt calm and peaceful?'].map((question, index) => (
      <TableRow key={index}>
        <TableCell sx={{ fontSize: '0.8rem' }}>{question}</TableCell>
        {[1, 2, 3, 4, 5].map((answer) => (
          <TableCell key={answer}>
            <FormControlLabel
              control={<Radio
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                value={answer}
                name={`timeQuestion${index}`}
                checked={surveyData[`timeQuestion${index}`] === answer.toString()}
                onChange={handleInputChange}
                sx={{ fontSize: '0.8rem' }}
              />}
            />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>
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
