import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline, Paper, MenuItem, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import CannabisBackground from './cannabis-background.webp';
import { useNavigate } from 'react-router-dom';

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledButton = styled(Button)(({ theme, success }) => ({
  backgroundColor: success ? theme.palette.success.main : theme.palette.primary.main,
  color: '#fff',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:hover': {
    backgroundColor: success ? theme.palette.success.dark : theme.palette.primary.dark,
  },
}));

const DocumentUpload = () => {
  const [documentType, setDocumentType] = useState('');
  const [frontDocument, setFrontDocument] = useState(null);
  const [backDocument, setBackDocument] = useState(null);
  const [frontUploadSuccess, setFrontUploadSuccess] = useState(false);
  const [backUploadSuccess, setBackUploadSuccess] = useState(false);
  const [userId, setUserId] = useState('');
  const [surveyId, setSurveyId] = useState(''); // Example surveyId, you should replace it with the actual surveyId or null for new users
  const [uploadStatus, setUploadStatus] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const telegramUser = JSON.parse(localStorage.getItem('telegramUser'));
    if (telegramUser) {
      setUserId(telegramUser.id);
    }
  }, []);

  const handleFileChange = (e, side) => {
    if (side === 'front') {
      setFrontDocument(e.target.files[0]);
      setFrontUploadSuccess(false); // Reset success state
    } else if (side === 'back') {
      setBackDocument(e.target.files[0]);
      setBackUploadSuccess(false); // Reset success state
    }
  };

  const handleUpload = async () => {
    if (!documentType || !frontDocument || !userId || (documentType !== 'Passport' && !backDocument)) {
      setUploadStatus('Все поля обязательны для заполнения');
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('frontDocument', frontDocument);
    if (backDocument) formData.append('backDocument', backDocument);
    formData.append('userId', userId);
    if (surveyId) formData.append('surveyId', surveyId);

    try {
      const response = await axios.post('https://medlevel.me/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('Документ успешно загружен');
      setOpenSnackbar(true);
      setFrontUploadSuccess(true);
      if (backDocument) {
        setBackUploadSuccess(true);
      }
      setTimeout(() => {
        navigate('/main-survey');
      }, 2000);
    } catch (error) {
      setUploadStatus('Ошибка при загрузке документа');
      setOpenSnackbar(true);
      console.error('Ошибка при загрузке документа:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            <StyledButton
              variant="contained"
              component="label"
              fullWidth
              success={frontUploadSuccess}
            >
              {frontUploadSuccess ? 'Успешно' : 'Лицевая сторона'}
              <input type="file" hidden onChange={(e) => handleFileChange(e, 'front')} />
            </StyledButton>
            {(documentType === 'NIE' || documentType === 'DNI') && (
              <StyledButton
                variant="contained"
                component="label"
                fullWidth
                success={backUploadSuccess}
              >
                {backUploadSuccess ? 'Успешно' : 'Обратная сторона'}
                <input type="file" hidden onChange={(e) => handleFileChange(e, 'back')} />
              </StyledButton>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
              onClick={handleUpload}
            >
              Загрузить
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={uploadStatus.includes('успешно') ? 'success' : 'error'}>
                {uploadStatus}
              </Alert>
            </Snackbar>
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default DocumentUpload;




