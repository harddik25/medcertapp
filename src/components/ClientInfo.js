import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CssBaseline, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';
import { useParams, useNavigate } from 'react-router-dom';
import CannabisBackground from './cannabis-background.webp'; // Замените на путь к вашему фоновому изображению

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const staticQuestions = [
  'General health',
  'Comparing health',
  'Day activities',
  'Physical health',
  'Depressed',
  'Social activities with groups',
  'Body pain',
  'Pain interfere with work',
  'Feelings',
  'Social Interference',
  'Health time'
];

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

  const formatAnswer = (answers) => {
    if (typeof answers === 'object') {
      return Object.values(answers).join('; ');
    }
    return answers;
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
                  {clientInfo.firstName} {clientInfo.lastName}
                </Typography>
                {clientInfo.pathology && (
                  <Typography variant="body1" sx={{ color: '#f44336', mb: 2 }}>
                    Патологии: {clientInfo.pathology}
                  </Typography>
                )}
                <Typography variant="h6" sx={{ color: '#388e3c' }}>
                  Ответы на опросы
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Вопрос</TableCell>
                        <TableCell>Ответ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staticQuestions.map((question, index) => (
                        <TableRow key={index}>
                          <TableCell>{question}</TableCell>
                          <TableCell>{formatAnswer(clientInfo.surveys[0][Object.keys(clientInfo.surveys[0])[index]])}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 2 }}>
                  {clientInfo.surveys[0].frontDocument && (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 2 }}
                      href={`https://medlevel.me/api/documents/download/${patientId}/${clientInfo.documentType}/front/${clientInfo.surveys[0].frontDocument.split('/').pop()}`}
                      target="_blank"
                    >
                      Скачать лицевую сторону
                    </Button>
                  )}
                  {clientInfo.surveys[0].backDocument && (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 2 }}
                      href={`https://medlevel.me/api/documents/download/${patientId}/${clientInfo.documentType}/back/${clientInfo.surveys[0].backDocument.split('/').pop()}`}
                      target="_blank"
                    >
                      Скачать обратную сторону
                    </Button>
                  )}
                </Box>
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



