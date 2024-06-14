import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CssBaseline, List, ListItem, ListItemText, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import CannabisBackground from '../logos/cannabis-background.jpeg'; // Замените на путь к вашему фоновому изображению

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:5000/api/admin/users');
        const usersData = await usersResponse.json();
        setUsers(usersData.users);

        const certificatesResponse = await fetch('http://localhost:5000/api/admin/certificates');
        const certificatesData = await certificatesResponse.json();
        setCertificates(certificatesData.certificates);
      } catch (error) {
        console.error('Ошибка при получении данных', error);
      }
    };

    fetchData();
  }, []);

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
              Кабинет администратора
            </Typography>
            <Box sx={{ mt: 3, width: '100%' }}>
              <Typography variant="h6" sx={{ color: '#4caf50' }}>Пользователи</Typography>
              <List>
                {users.map((user) => (
                  <ListItem key={user.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText
                      primary={user.name}
                      secondary={`ID: ${user.id}`}
                      sx={{ color: '#388e3c' }}
                    />
                    <Button variant="contained" color="secondary">Удалить</Button>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" sx={{ mt: 3, color: '#4caf50' }}>Сертификаты</Typography>
              <List>
                {certificates.map((certificate) => (
                  <ListItem key={certificate.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText
                      primary={certificate.name}
                      secondary={`ID: ${certificate.id}`}
                      sx={{ color: '#388e3c' }}
                    />
                    <Button variant="contained" color="secondary">Удалить</Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default AdminPanel;
