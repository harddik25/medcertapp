import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, Radio, FormControlLabel, Table, TableCell, TableHead, TableRow, TableBody,IconButton  } from '@mui/material';
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
  margin: '0 20px', // Добавлено для уменьшения размеров
  maxWidth: '800px', // Ограничение ширины
});

const TableHeader = styled(TableCell)({
  backgroundColor: '#e0f7fa',
  fontWeight: 'bold',
});

const MainSurvey = () => {
  const [surveyData, setSurveyData] = useState({});

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
              <div style={{ width: '30px', height: '30px' }}></div> {/* Пустое место для центрирования */}
            </Header>
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                IN GENERAL, WOULD YOU SAY THAT YOUR HEALTH IS
              </Typography>
              <Table>
                <TableBody>
                  {[
                    'Excellent',
                    'Very good',
                    'Good',
                    'Fair',
                    'Poor',
                  ].map((interference, index) => (
                    <TableRow key={index}>
                      <TableCell>{interference}</TableCell>
                      {[1].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                              value={answer}
                              name={`socialInterference${index}`}
                              checked={surveyData[`socialInterference${index}`] === answer.toString()}
                              onChange={handleInputChange}
                            />}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                COMPARING IT WITH THE ONE OF A YEAR AGO
              </Typography>
              <Table>
                <TableBody>
                  {[
                    'Much better now than a year ago',
                    'Somewhat worse now than a year ago',
                    'Same as a year ago',
                    'Much worse now than a year ago',
                  ].map((interference, index) => (
                    <TableRow key={index}>
                      <TableCell>{interference}</TableCell>
                      {[1].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                              value={answer}
                              name={`socialInterference${index}`}
                              checked={surveyData[`socialInterference${index}`] === answer.toString()}
                              onChange={handleInputChange}
                            />}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?
              </Typography>
              <Table>
                <TableBody>
                  {[
                    'All the time.',
                    'Most of the time.',
                    'Part of the time.',
                    'A little of the time.',
                    'None of the time.',
                  ].map((interference, index) => (
                    <TableRow key={index}>
                      <TableCell>{interference}</TableCell>
                      {[1].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                              value={answer}
                              name={`socialInterference${index}`}
                              checked={surveyData[`socialInterference${index}`] === answer.toString()}
                              onChange={handleInputChange}
                            />}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                How much of the time during the last 4 weeks?
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>All the time</TableHeader>
                    <TableHeader>Most of the time</TableHeader>
                    <TableHeader>Good part of the time</TableHeader>
                    <TableHeader>Part of the time</TableHeader>
                    <TableHeader>A small part of the time</TableHeader>
                    <TableHeader>No time</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                    <TableRow key={index}>
                      <TableCell>{time}</TableCell>
                      {[1, 2, 3, 4, 5, 6].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                              value={answer}
                              name={`time${index}`}
                              checked={surveyData[`time${index}`] === answer.toString()}
                              onChange={handleInputChange}
                            />}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?
              </Typography>
              <Table>
                <TableBody>
                  {[
                    'All the time.',
                    'Most of the time.',
                    'Part of the time.',
                    'A little of the time.',
                    'None of the time.',
                  ].map((interference, index) => (
                    <TableRow key={index}>
                      <TableCell>{interference}</TableCell>
                      {[1].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                              value={answer}
                              name={`socialInterference${index}`}
                              checked={surveyData[`socialInterference${index}`] === answer.toString()}
                              onChange={handleInputChange}
                            />}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                How much of the time during the last 4 weeks?
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>Definitely right</TableHeader>
                    <TableHeader>Mostly true</TableHeader>
                    <TableHeader>Don't know</TableHeader>
                    <TableHeader>Mostly false</TableHeader>
                    <TableHeader>Definitely false</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    'I seem to get sick a little more than other people.',
                    'I am as healthy as anyone you know.',
                    'I hope my health gets worse.',
                    'My health is excellent.',
                  ].map((time, index) => (
                    <TableRow key={index}>
                      <TableCell>{time}</TableCell>
                      {[1, 2, 3, 4, 5].map((answer) => (
                        <TableCell key={answer}>
                          <FormControlLabel
                            control={<Radio
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4caf50' }} />}
                              value={answer}
                              name={`healthTime${index}`}
                              checked={surveyData[`healthTime${index}`] === answer.toString()}
                              onChange={handleInputChange}
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

