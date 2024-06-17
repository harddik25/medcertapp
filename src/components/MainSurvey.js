import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, Radio, FormControlLabel, IconButton, styled } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
  backgroundColor: '#388e3c',
  borderRadius: '20px',
  padding: '10px',
  boxShadow: '0 0 10px rgba(0, 128, 0, 0.5)',
  marginBottom: '10px',
  textAlign: 'left', 
  fontWeight: 'bold',
});

const RadioGroupRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '5px',
});

const ScrollToTopButton = styled(IconButton)({
  position: 'absolute',
  bottom: 16,
  right: 16,
  backgroundColor: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
});

const MainSurvey = () => {
  const [surveyData, setSurveyData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({ ...surveyData, [name]: value });
  };

  const handleSubmit = () => {
    // Ensure all questions are answered before allowing submission
    const allAnswered = Object.keys(surveyData).length === totalQuestions;
    if (allAnswered) {
      navigate('/consultation');
    } else {
      alert('Please answer all the questions before proceeding.');
    }
  };

  const handleBackClick = () => {
    navigate('/profile');
  };

  const handleScrollToTop = () => {
    const container = document.querySelector('.MuiPaper-root');
    container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalQuestions = 9 + 4 + 3 + 5 + 6 + 4; // Update with actual number of questions

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <FullScreenPaper elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Header>
                <IconButton onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
                  <ArrowBackIcon style={{ color: '#388e3c' }} />
                </IconButton>
                <Typography component="h1" variant="h5" sx={{ color: '#388e3c', flexGrow: 1, textAlign: 'center' }}>
                  Health Survey
                </Typography>
                <div style={{ width: '30px', height: '30px' }}></div>
              </Header>
              <RoundedTypography sx={{ marginTop: 2 }}>
                The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?
              </RoundedTypography>
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
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`dayactivities${index}`}
                    value={surveyData[`dayactivities${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes very limited" />
                    <FormControlLabel value="2" control={<Radio />} label="Yes a bit limited" />
                    <FormControlLabel value="3" control={<Radio />} label="No, nothing limited" />
                  </RadioGroupRow>
                </Box>
              ))}

              <RoundedTypography sx={{ marginTop: 2 }}>
                During the last 4 weeks, have you had any of the following problems with your work or other normal daily activities as a result of your physical health?
              </RoundedTypography>
              {[
                'I have reduced the time I spend at work or other activities',
                'I have accomplished less than I would like',
                'I had some limitation in work or other activities',
                'I had difficulty and required an extra effort',
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`physicalhealth${index}`}
                    value={surveyData[`physicalhealth${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="2" control={<Radio />} label="No" />
                  </RadioGroupRow>
                </Box>
              ))}

              <RoundedTypography sx={{ marginTop: 2 }}>
                During the last 4 weeks, have you had any of the following problems at work or with other usual daily activities as a result of an emotional problem (such as feeling depressed or anxious)?
              </RoundedTypography>
              {[
                'I have reduced the amount of time I spend at work or doing other activities',
                'I have accomplished less than I would like',
                'I did not do work or other activities as carefully as usual',
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`emotionalproblem${index}`}
                    value={surveyData[`emotionalproblem${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="2" control={<Radio />} label="No" />
                  </RadioGroupRow>
                </Box>
              ))}
              <RoundedTypography sx={{ marginTop: 2 }}>
                During the past 4 weeks, to what extent have your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?
              </RoundedTypography>
              {[
                'No way.',
                'Slightly.',
                'Moderately.',
                'Quite.',
                'Extremely.',
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`socialactivitiesgroups${index}`}
                    value={surveyData[`socialactivitiesgroups${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="2" control={<Radio />} label="No" />
                  </RadioGroupRow>
                </Box>
              ))}
              
              <RoundedTypography sx={{ marginTop: 2 }}>
                How much body pain have you had in the last 4 weeks?
              </RoundedTypography>
              {[
                'Nothing',
                'Very soft.',
                'Soft.',
                'Moderate.',
                'Severe.',
                'Very severe',
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`bodypain${index}`}
                    value={surveyData[`bodypain${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="2" control={<Radio />} label="No" />
                  </RadioGroupRow>
                </Box>
              ))}
              
              <RoundedTypography sx={{ marginTop: 2 }}>
                During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?
              </RoundedTypography>
              {[
                'No way.',
                'Slightly.',
                'Moderately.',
                'Quite.',
                'Extremely.',
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`paininterfere${index}`}
                    value={surveyData[`paininterfere${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="2" control={<Radio />} label="No" />
                  </RadioGroupRow>
                </Box>
              ))}
              
              <RoundedTypography sx={{ marginTop: 2 }}>
                These questions are about how you are feeling and how things have been going for you in the last 4 weeks. For each question, please give the answer that is closest to how you felt.
              </RoundedTypography>
              <Table sx={{ minWidth: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableHeader></TableHeader>
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
              
              <RoundedTypography sx={{ marginTop: 2 }}>
                During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?
              </RoundedTypography>
              {[
                'All the time.',
                'Most of the time.',
                'Part of the time.',
                'A little of the time.',
                'None of the time.',
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`socialInterference${index}`}
                    value={surveyData[`socialInterference${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="2" control={<Radio />} label="No" />
                  </RadioGroupRow>
                </Box>
              ))}
              
              <RoundedTypography sx={{ marginTop: 2 }}>
                How much of the time during the last 4 weeks?
              </RoundedTypography>
              <Table sx={{ minWidth: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableHeader></TableHeader>
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
              
              <ScrollToTopButton onClick={handleScrollToTop}>
                <ArrowUpwardIcon />
              </ScrollToTopButton>
              
              </Box>
              </FullScreenPaper>
              </Container>
              </Background>
              </ThemeProvider>
              );
              };
              
              export default MainSurvey;
