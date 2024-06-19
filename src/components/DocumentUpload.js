import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline, Paper, MenuItem, Alert } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import CannabisBackground from './cannabis-background.webp';

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const StyledButton = styled(Button)({
  backgroundColor: '#4caf50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#45a049',
  },
  marginBottom: '16px',
});

const DocumentUpload = ({ userId }) => {
  const [documentType, setDocumentType] = useState('');
  const [frontDocument, setFrontDocument] = useState(null);
  const [backDocument, setBackDocument] = useState(null);
  const [surveyId, setSurveyId] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchSurveyId = async () => {
      if (userId) {
        try {
          const response = await axios.get(`https://medlevel.me/api/surveys/latest/${userId}`);
          if (response.data.success && response.data.surveyId) {
            setSurveyId(response.data.surveyId);
          }
        } catch (error) {
          console.error('Ошибка при получении surveyId:', error);
        }
      }
    };

    fetchSurveyId();
  }, [userId]);

  const handleFileChange = (e, side) => {
    if (side === 'front') {
      setFrontDocument(e.target.files[0]);
    } else if (side === 'back') {
      setBackDocument(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!documentType || !userId || !surveyId || (documentType !== 'Passport' && (!frontDocument || !backDocument)) || (documentType === 'Passport' && !frontDocument)) {
      setUploadStatus('Все поля обязательны для заполнения');
      return;
    }

    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('frontDocument', frontDocument);
    if (backDocument) formData.append('backDocument', backDocument);
    formData.append('userId', userId);
    formData.append('surveyId', surveyId);

    try {
      const response = await axios.post('https://medlevel.me/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('Документ успешно загружен');
    } catch (error) {
      setUploadStatus('Ошибка при загрузке документа');
      console.error('Ошибка при загрузке документа:', error);
    }
  };

  return (
    <Background>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: 2 }}>
              Загрузка документа
            </Typography>
            <TextField
              select
              variant="outlined"
              margin="normal"
              fullWidth
              label="Тип документа"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <MenuItem value="NIE">NIE</MenuItem>
              <MenuItem value="DNI">DNI</MenuItem>
              <MenuItem value="Passport">Passport</MenuItem>
            </TextField>
            <input type="file" onChange={(e) => handleFileChange(e, 'front')} />
            {(documentType === 'NIE' || documentType === 'DNI') && (
              <input type="file" onChange={(e) => handleFileChange(e, 'back')} />
            )}
            <StyledButton
              type="button"
              fullWidth
              variant="contained"
              onClick={handleUpload}
            >
              Загрузить
            </StyledButton>
            {uploadStatus && (
              <Alert severity={uploadStatus.includes('успешно') ? 'success' : 'error'}>
                {uploadStatus}
              </Alert>
            )}
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default DocumentUpload;



