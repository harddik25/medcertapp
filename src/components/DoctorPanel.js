import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, CssBaseline, Paper, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { styled } from '@mui/system';
import CannabisBackground from '../logos/cannabis-background.jpeg';

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const DoctorPanel = () => {
  const [openAddSlotDialog, setOpenAddSlotDialog] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [freeSlots, setFreeSlots] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchFreeSlots();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://medlevel.me/api/consultations/appointments');
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Ошибка при получении списка консультаций', error);
    }
  };

  const fetchFreeSlots = async () => {
    try {
      const response = await fetch('https://medlevel.me/api/consultations/free-slots');
      const data = await response.json();
      setFreeSlots(data.slots);
    } catch (error) {
      console.error('Ошибка при получении списка свободного времени', error);
    }
  };

  const handleAddSlotOpen = () => {
    setOpenAddSlotDialog(true);
  };

  const handleAddSlotClose = () => {
    setOpenAddSlotDialog(false);
  };

  const handleAddSlotSave = async () => {
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
        setFreeSlots([...freeSlots, data.freeSlot]);
        setOpenAddSlotDialog(false);
      } else {
        console.error('Ошибка при добавлении свободного времени');
      }
    } catch (error) {
      console.error('Ошибка при добавлении свободного времени', error);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const response = await fetch(`https://medlevel.me/api/consultations/free-slots/${slotId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setFreeSlots(freeSlots.filter(slot => slot._id !== slotId));
      } else {
        console.error('Ошибка при удалении свободного времени');
      }
    } catch (error) {
      console.error('Ошибка при удалении свободного времени', error);
    }
  };

  return (
    <Background>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c' }}>
              Кабинет врача
            </Typography>
            <Box sx={{ mt: 2, width: '100%' }}>
              <Button variant="contained" color="primary" onClick={handleAddSlotOpen} sx={{ mb: 2 }}>
                Добавить свободное время
              </Button>
              <Button variant="contained" color="secondary" onClick={fetchAppointments} sx={{ mb: 2 }}>
                Просмотр записей пользователей
              </Button>
              <Button variant="contained" color="secondary" onClick={fetchFreeSlots} sx={{ mb: 2 }}>
                Просмотр свободных слотов
              </Button>
              <Typography variant="h6" sx={{ mt: 2 }}>Записи пользователей</Typography>
              <List>
                {appointments.length > 0 ? appointments.map((appointment, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${appointment.date} ${appointment.time}`}
                      secondary={`Пациент: ${appointment.patientName || 'Нет записей'}`}
                      sx={{ color: '#388e3c' }}
                    />
                  </ListItem>
                )) : (
                  <Typography>Нет записей пользователей</Typography>
                )}
              </List>
              <Typography variant="h6" sx={{ mt: 2 }}>Свободные слоты</Typography>
              <List>
                {freeSlots.length > 0 ? freeSlots.map((slot, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${slot.date} ${slot.time}`}
                      sx={{ color: '#388e3c' }}
                    />
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteSlot(slot._id)}>
                      Удалить
                    </Button>
                  </ListItem>
                )) : (
                  <Typography>Свободных слотов нет</Typography>
                )}
              </List>
            </Box>
          </Box>
        </Paper>
        <Dialog open={openAddSlotDialog} onClose={handleAddSlotClose}>
          <DialogTitle>Добавить свободное время</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Дата"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Время"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddSlotClose} color="primary">
              Отмена
            </Button>
            <Button onClick={handleAddSlotSave} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Background>
  );
};

export default DoctorPanel;


