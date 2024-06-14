import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField } from '@mui/material';
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
  const [healthQuestions, setHealthQuestions] = useState({
    question1: '',
    question2: '',
    question3: '',
    // добавьте другие вопросы
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHealthQuestions({ ...healthQuestions, [name]: value });
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
                Опросник о состоянии здоровья
              </Typography>
              <TextField
                label="Вопрос 1"
                name="question1"
                value={healthQuestions.question1}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Вопрос 2"
                name="question2"
                value={healthQuestions.question2}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Вопрос 3"
                name="question3"
                value={healthQuestions.question3}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              {/* Добавьте другие вопросы */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleSubmit}
              >
                Продолжить
              </Button>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default MainSurvey;

