import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline, Paper } from '@mui/material';
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

const DocumentUpload = () => {
  const [documentType, setDocumentType] = useState('');
  const [document, setDocument] = useState(null);
  const [userId, setUserId] = useState(''); // Example userId, you should replace it with the actual userId
  const [surveyId, setSurveyId] = useState(''); // Example surveyId, you should replace it with the actual surveyId
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!documentType || !document || !userId || !surveyId) {
      setUploadStatus('Все поля обязательны для заполнения');
      return;
    }

    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('document', document);
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
              variant="outlined"
              margin="normal"
              fullWidth
              label="Тип документа"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
              onClick={handleUpload}
            >
              Загрузить
            </Button>
            {uploadStatus && (
              <Typography variant="body2" color="error">
                {uploadStatus}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default DocumentUpload;


