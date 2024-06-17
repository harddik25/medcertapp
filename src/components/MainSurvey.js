import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, MenuItem, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const theme = createTheme();

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const FullScreenPaper = styled(Paper)({
  height: 'calc(100vh - 40px)',
  overflowY: 'auto',
  padding: 3,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  width: '100%',
  maxWidth: '800px',
});

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
});

const TableHeader = styled('th')({
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: '#f2f2f2',
});

const TableCell = styled('td')({
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
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
    setSurveyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    navigate('/consultation');
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth={false} disableGutters>
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
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?
              </Typography>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Activity</TableHeader>
                    <TableHeader>Yes, very limited (1)</TableHeader>
                    <TableHeader>Yes, a bit limited (2)</TableHeader>
                    <TableHeader>No, nothing limited (3)</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports.',
                    'Moderate activities, such as moving a table, pushing a vacuum, go bowling or play golf.',
                    'Lifting or carrying groceries.',
                    'Climbing several flights of stairs.',
                    'Climbing one flight of stairs.',
                    'Bending, kneeling, or stooping.',
                    'Walking more than a mile.',
                    'Walking several blocks.',
                    'Walking one block.',
                    'Bathing or dressing yourself.',
                  ].map((activity, index) => (
                    <tr key={index}>
                      <TableCell>{activity}</TableCell>
                      {[1, 2, 3].map((limit) => (
                        <TableCell key={limit}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={limit}
                            name={`activity${index}`}
                            checked={surveyData[`activity${index}`] === limit}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the last 4 weeks, have you had any of the following problems with your work or other normal daily activities as a result of your physical health?
              </Typography>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Problem</TableHeader>
                    <TableHeader>Yes</TableHeader>
                    <TableHeader>No</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'I have reduced the time I spend at work or other activities.',
                    'I have accomplished less than I would like.',
                    'I was limited in the kind of work or other activities.',
                    'I had difficulty performing the work or other activities (for example, it took extra effort).',
                  ].map((problem, index) => (
                    <tr key={index}>
                      <TableCell>{problem}</TableCell>
                      {[1, 2].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`physicalProblem${index}`}
                            checked={surveyData[`physicalProblem${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the last 4 weeks, have you had any of the following problems with your work or other usual daily activities as a result of an emotional problem (such as feeling depressed or anxious)?

              </Typography>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Problem</TableHeader>
                    <TableHeader>Yes</TableHeader>
                    <TableHeader>No</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'I have reduced the amount of time I spend at work or other activities.',
                    'I have accomplished less than I would like.',
                    'I did not do work or other activities as carefully as usual.',
                  ].map((problem, index) => (
                    <tr key={index}>
                      <TableCell>{problem}</TableCell>
                      {[1, 2].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`emotionalProblem${index}`}
                            checked={surveyData[`emotionalProblem${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the past 4 weeks, to what extent have your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?
              </Typography>
              <Table>
                <tbody>
                  {[
                    'No way.',
                    'Slightly.',
                    'Moderately.',
                    'Quite.',
                    'Extremely.',
                  ].map((extent, index) => (
                    <tr key={index}>
                      <TableCell>{extent}</TableCell>
                      {[1].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`extent${index}`}
                            checked={surveyData[`extent${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                How much body pain have you had in the last 4 weeks?
              </Typography>
              <Table>
                <tbody>
                  {[
                    'Nothing.',
                    'Very soft.',
                    'Soft.',
                    'Moderate.',
                    'Severe.',
                    'Very severe.',
                  ].map((painLevel, index) => (
                    <tr key={index}>
                      <TableCell>{painLevel}</TableCell>
                      {[1].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`painLevel${index}`}
                            checked={surveyData[`painLevel${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?
              </Typography>
              <Table>
                <tbody>
                  {[
                    'No way.',
                    'Slightly.',
                    'Moderately.',
                    'Quite.',
                    'Extremely.',
                  ].map((interference, index) => (
                    <tr key={index}>
                      <TableCell>{interference}</TableCell>
                      {[1].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`interference${index}`}
                            checked={surveyData[`interference${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                How much of the time during the last 4 weeks?
              </Typography>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>All the time</TableHeader>
                    <TableHeader>Most of the time</TableHeader>
                    <TableHeader>Good part of the time</TableHeader>
                    <TableHeader>Part of the time</TableHeader>
                    <TableHeader>A small part of the time</TableHeader>
                    <TableHeader>No time</TableHeader>
                  </tr>
                </thead>
                <tbody>
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
                  ].map((time, index) => (
                    <tr key={index}>
                      <TableCell>{time}</TableCell>
                      {[1, 2, 3, 4, 5, 6].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`time${index}`}
                            checked={surveyData[`time${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?
                PLEASE CIRCLE THE NUMBER THAT BEST DESCRIBES YOUR ANSWER.
              </Typography>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Interference</TableHeader>
                    <TableHeader>1</TableHeader>
                    <TableHeader>2</TableHeader>
                    <TableHeader>3</TableHeader>
                    <TableHeader>4</TableHeader>
                    <TableHeader>5</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'All the time.',
                    'Most of the time.',
                    'Part of the time.',
                    'A little of the time.',
                    'None of the time.',
                  ].map((interference, index) => (
                    <tr key={index}>
                      <TableCell>{interference}</TableCell>
                      {[1, 2, 3, 4, 5].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`socialInterference${index}`}
                            checked={surveyData[`socialInterference${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                How much of the time during the last 4 weeks?
                PLEASE CIRCLE THE NUMBER THAT BEST DESCRIBES YOUR ANSWER.
              </Typography>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>All the time</TableHeader>
                    <TableHeader>Most of the time</TableHeader>
                    <TableHeader>Good part of the time</TableHeader>
                    <TableHeader>Part of the time</TableHeader>
                    <TableHeader>A small part of the time</TableHeader>
                    <TableHeader>No time</TableHeader>
                  </tr>
                </thead>
                <tbody>
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
                  ].map((time, index) => (
                    <tr key={index}>
                      <TableCell>{time}</TableCell>
                      {[1, 2, 3, 4, 5, 6].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`time${index}`}
                            checked={surveyData[`time${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?
              </Typography>
              <Table>
                <tbody>
                  {[
                    'All the time.',
                    'Most of the time.',
                    'Part of the time.',
                    'A little of the time.',
                    'None of the time.',
                  ].map((interference, index) => (
                    <tr key={index}>
                      <TableCell>{interference}</TableCell>
                      {[1].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`socialInterference${index}`}
                            checked={surveyData[`socialInterference${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                How much of the time during the last 4 weeks?
              </Typography>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>Definitely right</TableHeader>
                    <TableHeader>Mostly true</TableHeader>
                    <TableHeader>Don't know</TableHeader>
                    <TableHeader>Mostly false</TableHeader>
                    <TableHeader>Definitely false</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'I seem to get sick a little more than other people.',
                    'I am as healthy as anyone you know.',
                    'I hope my health gets worse.',
                    'My health is excellent.',
                  ].map((time, index) => (
                    <tr key={index}>
                      <TableCell>{time}</TableCell>
                      {[1, 2, 3, 4, 5].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                            />}
                            value={answer}
                            name={`healthTime${index}`}
                            checked={surveyData[`healthTime${index}`] === answer}
                            onChange={handleInputChange}
                          />
                        </TableCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
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

