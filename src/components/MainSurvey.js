import React, { useState ,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Импорт Axios
import { Container, Box, Typography, Button, CssBaseline, Paper, Radio, FormControlLabel, RadioGroup, IconButton } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CannabisBackground from './cannabis-background.webp';

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
  const [surveyData, setSurveyData] = useState({});
  const navigate = useNavigate();
  const paperRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({ ...surveyData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/survey/save', surveyData);
      navigate('/consultation');
    } catch (error) {
      console.error('Error saving survey data:', error);
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
                    <FormControlLabel value="veryLimited" control={<Radio />} label="Yes very limited" />
                    <FormControlLabel value="bitLimited" control={<Radio />} label="Yes a bit limited" />
                    <FormControlLabel value="notLimited" control={<Radio />} label="No, nothing limited" />
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
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroupRow>
                </Box>
              ))}

              <RoundedTypography sx={{ marginTop: 2 }}>
                During the past 4 weeks, to what extent have your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="socialactivitiesgroups"
                  value={surveyData['socialactivitiesgroups'] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="noWay" control={<Radio />} label="No way." />
                  <FormControlLabel value="slightly" control={<Radio />} label="Slightly." />
                  <FormControlLabel value="moderately" control={<Radio />} label="Moderately." />
                  <FormControlLabel value="quite" control={<Radio />} label="Quite." />
                  <FormControlLabel value="extremely" control={<Radio />} label="Extremely." />
                </RadioGroupRow>
              </Box>

              <RoundedTypography sx={{ marginTop: 2 }}>
                How much body pain have you had in the last 4 weeks?
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="bodypain"
                  value={surveyData['bodypain'] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="nothing" control={<Radio />} label="Nothing" />
                  <FormControlLabel value="verySoft" control={<Radio />} label="Very soft." />
                  <FormControlLabel value="soft" control={<Radio />} label="Soft." />
                  <FormControlLabel value="moderate" control={<Radio />} label="Moderate." />
                  <FormControlLabel value="severe" control={<Radio />} label="Severe." />
                  <FormControlLabel value="verySevere" control={<Radio />} label="Very severe." />
                </RadioGroupRow>
              </Box>
              
              <RoundedTypography sx={{ marginTop: 2 }}>
                During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="paininterfere"
                  value={surveyData['paininterfere'] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="noWay" control={<Radio />} label="No way." />
                  <FormControlLabel value="slightly" control={<Radio />} label="Slightly." />
                  <FormControlLabel value="moderately" control={<Radio />} label="Moderately." />
                  <FormControlLabel value="quite" control={<Radio />} label="Quite." />
                  <FormControlLabel value="extremely" control={<Radio />} label="Extremely." />
                </RadioGroupRow>
              </Box>
                    
              <RoundedTypography sx={{ marginTop: 2 }}>
                These questions are about how you are feeling and how things have been going for you in the last 4 weeks. For each question, please give the answer that is closest to how you felt.
              </RoundedTypography>
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
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`feelings${index}`}
                    value={surveyData[`feelings${index}`] || ''}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="All the time" />
                    <FormControlLabel value="2" control={<Radio />} label="Most of the time" />
                    <FormControlLabel value="3" control={<Radio />} label="Good part of the time" />
                    <FormControlLabel value="4" control={<Radio />} label="Part of the time" />
                    <FormControlLabel value="5" control={<Radio />} label="A small part of the time" />
                    <FormControlLabel value="6" control={<Radio />} label="No time" />
                  </RadioGroupRow>
                </Box>
              ))}
                
              <RoundedTypography sx={{ marginTop: 2 }}>
                During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?
              </RoundedTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
                <RadioGroupRow
                  name="socialInterference"
                  value={surveyData['socialInterference'] || ''}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="allTheTime" control={<Radio />} label="All the time." />
                  <FormControlLabel value="mostOfTheTime" control={<Radio />} label="Most of the time." />
                  <FormControlLabel value="partOfTheTime" control={<Radio />} label="Part of the time." />
                  <FormControlLabel value="aLittleOfTheTime" control={<Radio />} label="A little of the time." />
                  <FormControlLabel value="noneOfTheTime" control={<Radio />} label="None of the time." />
                </RadioGroupRow>
              </Box>
                    
              <RoundedTypography sx={{ marginTop: 2 }}>
                How much of the time during the last 4 weeks?
              </RoundedTypography>
              {[
                'I seem to get sick a little more than other people.',
                'I am as healthy as anyone you know.',
                'I hope my health gets worse.',
                'My health is excellent.',
              ].map((question, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2, width: '100%', }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{question}</Typography>
                  <RadioGroupRow
                    name={`healthTime${index}`}
                    value={surveyData[`healthTime${index}`] || ''}
                    onChange={handleInputChange}
                    
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Definitely right" />
                    <FormControlLabel value="2" control={<Radio />} label="Mostly true" />
                    <FormControlLabel value="3" control={<Radio />} label="Don't know" />
                    <FormControlLabel value="4" control={<Radio />} label="Mostly false" />
                    <FormControlLabel value="5" control={<Radio />} label="Definitely false" />
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
