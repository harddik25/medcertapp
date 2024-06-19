import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CssBaseline, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useParams, useNavigate } from 'react-router-dom';
import CannabisBackground from './cannabis-background.webp'; // Замените на путь к вашему фоновому изображению

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const ClientInfo = () => {
  const { patientId } = useParams();
  const [clientInfo, setClientInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const response = await fetch(`https://medlevel.me/api/clients/info/${patientId}`);
        const data = await response.json();
        setClientInfo(data.clientInfo);
      } catch (error) {
        console.error('Ошибка при получении информации о клиенте', error);
      }
    };

    fetchClientInfo();
  }, [patientId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDownloadDocument = async (documentType) => {
    try {
      const response = await fetch(`https://medlevel.me/api/documents/download/${patientId}/${documentType}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${patientId}_${documentType}`; // Имя файла при загрузке
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Ошибка при загрузке документа', error);
    }
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
            <Button variant="contained" color="primary" onClick={handleBackClick} sx={{ mb: 2 }}>
              Назад
            </Button>
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c' }}>
              Информация о клиенте
            </Typography>
            {clientInfo ? (
              <Box sx={{ mt: 2, width: '100%' }}>
                <Typography variant="h6" sx={{ color: '#388e3c' }}>
                  Ответы на опросы
                </Typography>
                <List>
                  {clientInfo.surveys.map((survey, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={survey.question} secondary={survey.answer} sx={{ color: '#388e3c' }} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h6" sx={{ mt: 2, color: '#388e3c' }}>
                  Документы
                </Typography>
                <List>
                  {clientInfo.documents.map((documentType, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={documentType} sx={{ color: '#388e3c' }} />
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ml: 2 }}
                        onClick={() => handleDownloadDocument(documentType)}
                      >
                        Скачать
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ) : (
              <Typography variant="body1" sx={{ mt: 2, color: '#f44336' }}>
                Информация о клиенте не найдена.
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default ClientInfo;


