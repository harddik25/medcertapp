import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, FormControl, FormControlLabel, Radio, RadioGroup, CssBaseline, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import CannabisBackground from '../logos/cannabis-background.jpeg'; // Замените на путь к вашему фоновому изображению

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const SurveyForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    generalHealth: '',
    healthComparison: '',
    physicalLimitations: '',
    emotionalProblems: '',
    socialActivities: '',
    painLevel: '',
    painInterference: '',
    energyLevel: '',
    nervousness: '',
    downhearted: '',
    calmness: '',
    happiness: '',
    documentType: '',
    documentFile: null,
    userId: 'USER_ID', // Замените на ID пользователя
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      documentFile: e.target.files[0]
    });
  };

  const handleNextStep = () => {
    // Проверяем, что все обязательные поля заполнены
    const requiredFields = ['generalHealth', 'healthComparison', 'documentType', 'documentFile'];
    for (let field of requiredFields) {
      if (!form[field]) {
        setOpenSnackbar(true);
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const response = await fetch('http://localhost:5000/api/surveys', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Survey submitted:', await response.json());
        // Дополнительная логика после успешной отправки
      } else {
        console.error('Ошибка при отправке опроса');
      }
    } catch (error) {
      console.error('Ошибка при отправке опроса', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Background>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c' }}>
              Medical Outcomes Study Questionnaire
            </Typography>
            <Box sx={{ mt: 1, width: '100%' }}>
              {step === 1 && (
                <>
                  <Typography variant="h6">1. In general, would you say that your health is:</Typography>
                  <FormControl component="fieldset" required>
                    <RadioGroup name="generalHealth" value={form.generalHealth} onChange={handleInputChange}>
                      <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
                      <FormControlLabel value="Very good" control={<Radio />} label="Very good" />
                      <FormControlLabel value="Good" control={<Radio />} label="Good" />
                      <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
                      <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
                    </RadioGroup>
                  </FormControl>
                  <Typography variant="h6">2. Compared to one year ago, how would you rate your health in general now?</Typography>
                  <FormControl component="fieldset" required>
                    <RadioGroup name="healthComparison" value={form.healthComparison} onChange={handleInputChange}>
                      <FormControlLabel value="Much better now than one year ago" control={<Radio />} label="Much better now than one year ago" />
                      <FormControlLabel value="Somewhat better now than one year ago" control={<Radio />} label="Somewhat better now than one year ago" />
                      <FormControlLabel value="About the same as one year ago" control={<Radio />} label="About the same as one year ago" />
                      <FormControlLabel value="Somewhat worse now than one year ago" control={<Radio />} label="Somewhat worse now than one year ago" />
                      <FormControlLabel value="Much worse now than one year ago" control={<Radio />} label="Much worse now than one year ago" />
                    </RadioGroup>
                  </FormControl>
                  <Typography variant="h6">Document Type</Typography>
                  <FormControl component="fieldset" required>
                    <RadioGroup name="documentType" value={form.documentType} onChange={handleInputChange}>
                      <FormControlLabel value="DNI" control={<Radio />} label="DNI" />
                      <FormControlLabel value="NIE" control={<Radio />} label="NIE" />
                      <FormControlLabel value="Passport" control={<Radio />} label="Passport" />
                    </RadioGroup>
                  </FormControl>
                  <Typography variant="h6">Upload Document</Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="file"
                    onChange={handleFileChange}
                    sx={{ mb: 2 }}
                    required
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                  <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error">
                      Please fill all required fields
                    </Alert>
                  </Snackbar>
                </>
              )}
              {step === 2 && (
                <>
                  <Typography variant="h6">3. Does your health now limit you in these activities? If so, how much?</Typography>
                  <FormControl component="fieldset" required>
                    <Typography>Vigorous activities (e.g., running, lifting heavy objects, strenuous sports):</Typography>
                    <RadioGroup name="physicalLimitations" value={form.physicalLimitations} onChange={handleInputChange}>
                      <FormControlLabel value="Yes, limited a lot" control={<Radio />} label="Yes, limited a lot" />
                      <FormControlLabel value="Yes, limited a little" control={<Radio />} label="Yes, limited a little" />
                      <FormControlLabel value="No, not limited at all" control={<Radio />} label="No, not limited at all" />
                    </RadioGroup>
                    <Typography>Moderate activities (e.g., moving a table, pushing a vacuum, bowling, or playing golf):</Typography>
                    <RadioGroup name="physicalLimitationsModerate" value={form.physicalLimitationsModerate} onChange={handleInputChange}>
                      <FormControlLabel value="Yes, limited a lot" control={<Radio />} label="Yes, limited a lot" />
                      <FormControlLabel value="Yes, limited a little" control={<Radio />} label="Yes, limited a little" />
                      <FormControlLabel value="No, not limited at all" control={<Radio />} label="No, not limited at all" />
                    </RadioGroup>
                    <Typography>Climbing several flights of stairs:</Typography>
                    <RadioGroup name="physicalLimitationsStairs" value={form.physicalLimitationsStairs} onChange={handleInputChange}>
                      <FormControlLabel value="Yes, limited a lot" control={<Radio />} label="Yes, limited a lot" />
                      <FormControlLabel value="Yes, limited a little" control={<Radio />} label="Yes, limited a little" />
                      <FormControlLabel value="No, not limited at all" control={<Radio />} label="No, not limited at all" />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                </>
              )}
              {step === 3 && (
                <>
                  <Typography variant="h6">4. During the last 4 weeks, have you had any of the following problems with your work or other daily activities as a result of your physical health?</Typography>
                  <FormControl component="fieldset" required>
                    <Typography>Accomplished less than you would like:</Typography>
                    <RadioGroup name="workProblems" value={form.workProblems} onChange={handleInputChange}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    <Typography>Were limited in the kind of work or other activities:</Typography>
                    <RadioGroup name="workLimitations" value={form.workLimitations} onChange={handleInputChange}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                </>
              )}
              {step === 4 && (
                <>
                  <Typography variant="h6">5. During the last 4 weeks, have you had any of the following problems at work or other usual daily activities as a result of any emotional problems (such as feeling depressed or anxious)?</Typography>
                  <FormControl component="fieldset" required>
                    <Typography>Accomplished less than you would like:</Typography>
                    <RadioGroup name="emotionalProblems" value={form.emotionalProblems} onChange={handleInputChange}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                    <Typography>Did work or other activities less carefully than usual:</Typography>
                    <RadioGroup name="emotionalLimitations" value={form.emotionalLimitations} onChange={handleInputChange}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                </>
              )}
              {step === 5 && (
                <>
                  <Typography variant="h6">6. During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and housework)?</Typography>
                  <FormControl component="fieldset" required>
                    <RadioGroup name="painInterference" value={form.painInterference} onChange={handleInputChange}>
                      <FormControlLabel value="Not at all" control={<Radio />} label="Not at all" />
                      <FormControlLabel value="A little bit" control={<Radio />} label="A little bit" />
                      <FormControlLabel value="Moderately" control={<Radio />} label="Moderately" />
                      <FormControlLabel value="Quite a bit" control={<Radio />} label="Quite a bit" />
                      <FormControlLabel value="Extremely" control={<Radio />} label="Extremely" />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                </>
              )}
              {step === 6 && (
                <>
                  <Typography variant="h6">7. How much of the time during the last 4 weeks:</Typography>
                  <FormControl component="fieldset" required>
                    <Typography>Did you feel full of energy?</Typography>
                    <RadioGroup name="energyLevel" value={form.energyLevel} onChange={handleInputChange}>
                      <FormControlLabel value="All of the time" control={<Radio />} label="All of the time" />
                      <FormControlLabel value="Most of the time" control={<Radio />} label="Most of the time" />
                      <FormControlLabel value="A good bit of the time" control={<Radio />} label="A good bit of the time" />
                      <FormControlLabel value="Some of the time" control={<Radio />} label="Some of the time" />
                      <FormControlLabel value="A little bit of the time" control={<Radio />} label="A little bit of the time" />
                      <FormControlLabel value="None of the time" control={<Radio />} label="None of the time" />
                    </RadioGroup>
                    <Typography>Were you very nervous?</Typography>
                    <RadioGroup name="nervousness" value={form.nervousness} onChange={handleInputChange}>
                      <FormControlLabel value="All of the time" control={<Radio />} label="All of the time" />
                      <FormControlLabel value="Most of the time" control={<Radio />} label="Most of the time" />
                      <FormControlLabel value="A good bit of the time" control={<Radio />} label="A good bit of the time" />
                      <FormControlLabel value="Some of the time" control={<Radio />} label="Some of the time" />
                      <FormControlLabel value="A little bit of the time" control={<Radio />} label="A little bit of the time" />
                      <FormControlLabel value="None of the time" control={<Radio />} label="None of the time" />
                    </RadioGroup>
                    <Typography>Have you felt so down in the dumps nothing could cheer you up?</Typography>
                    <RadioGroup name="downhearted" value={form.downhearted} onChange={handleInputChange}>
                      <FormControlLabel value="All of the time" control={<Radio />} label="All of the time" />
                      <FormControlLabel value="Most of the time" control={<Radio />} label="Most of the time" />
                      <FormControlLabel value="A good bit of the time" control={<Radio />} label="A good bit of the time" />
                      <FormControlLabel value="Some of the time" control={<Radio />} label="Some of the time" />
                      <FormControlLabel value="A little bit of the time" control={<Radio />} label="A little bit of the time" />
                      <FormControlLabel value="None of the time" control={<Radio />} label="None of the time" />
                    </RadioGroup>
                    <Typography>Have you been a happy person?</Typography>
                    <RadioGroup name="happiness" value={form.happiness} onChange={handleInputChange}>
                      <FormControlLabel value="All of the time" control={<Radio />} label="All of the time" />
                      <FormControlLabel value="Most of the time" control={<Radio />} label="Most of the time" />
                      <FormControlLabel value="A good bit of the time" control={<Radio />} label="A good bit of the time" />
                      <FormControlLabel value="Some of the time" control={<Radio />} label="Some of the time" />
                      <FormControlLabel value="A little bit of the time" control={<Radio />} label="A little bit of the time" />
                      <FormControlLabel value="None of the time" control={<Radio />} label="None of the time" />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: '#4caf50', color: '#fff' }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default SurveyForm;
