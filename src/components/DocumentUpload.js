import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, MenuItem } from '@mui/material';
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

const diseases = [
  { value: 'Alzheimer', label: 'Alzheimer' },
  { value: 'Anorexia', label: 'Anorexia' },
  // добавьте другие заболевания
];

const DocumentUpload = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [allergyInfo, setAllergyInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Обработка данных и переход к основному опроснику
    navigate('/main-survey');
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
                Upload Documents and Select Disease
              </Typography>
              <TextField
                select
                label="Select Disease"
                value={selectedDisease}
                onChange={(e) => setSelectedDisease(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {diseases.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Do you have any drug allergies?"
                value={allergyInfo}
                onChange={(e) => setAllergyInfo(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default DocumentUpload;

