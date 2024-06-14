import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CssBaseline, List, ListItem, ListItemText, Button, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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

const DoctorPanel = () => {
  const [freeSlots, setFreeSlots] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchFreeSlots = async () => {
      try {
        const response = await fetch('https://medlevel.me/api/consultations/free-slots');
        const data = await response.json();
        setFreeSlots(data.freeSlots);
      } catch (error) {
        console.error('Ошибка при получении свободного времени', error);
      }
    };

    const fetchFutureAppointments = async () => {
      try {
        const response = await fetch('https://medlevel.me/api/consultations/future-appointments');
        const data = await response.json();
        setFutureAppointments(data.appointments);
      } catch (error) {
        console.error('Ошибка при получении будущих консультаций', error);
      }
    };

    fetchFreeSlots();
    fetchFutureAppointments();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!date || !time) {
      alert('Дата и время обязательны');
      return;
    }

    try {
      const response = await fetch('https://medlevel.me/api/consultations/add-free-slot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time }),
      });
      const data = await response.json();
      if (data.success) {
        setFreeSlots([...freeSlots, { date, time }]);
        setOpen(false);
      } else {
        console.error('Ошибка при сохранении свободного времени');
      }
    } catch (error) {
      console.error('Ошибка при сохранении свободного времени', error);
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
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c' }}>
              Кабинет врача
            </Typography>
            <Box sx={{ mt: 1, width: '100%' }}>
              <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mb: 2 }}>
                Добавить свободное время для приема
              </Button>
              <Button variant="contained" color="secondary" sx={{ mb: 2 }} onClick={fetchFutureAppointments}>
                Будущие консультации
              </Button>
              <List>
                {futureAppointments.map((appointment, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${appointment.date} ${appointment.time}`}
                      secondary={`Пациент: ${appointment.patientName || 'Нет записей'}`}
                      sx={{ color: '#388e3c' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Paper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Добавить свободное время для приема</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Дата"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Время"
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={handleSave} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Background>
  );
};

export default DoctorPanel;
