import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const [appointments, setAppointments] = useState([]);
  const [freeSlots, setFreeSlots] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
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

    fetchAppointments();
    fetchFreeSlots();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
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
        setOpen(false);
      } else {
        console.error('Ошибка при сохранении времени приема');
      }
    } catch (error) {
      console.error('Ошибка при сохранении времени приема', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://medlevel.me/api/consultations/free-slots/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setFreeSlots(freeSlots.filter(slot => slot._id !== id));
      } else {
        console.error('Ошибка при удалении времени приема');
      }
    } catch (error) {
      console.error('Ошибка при удалении времени приема', error);
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
                Добавить время приема
              </Button>
              <List>
                {freeSlots.map((slot, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${slot.date} ${slot.time}`} sx={{ color: '#388e3c' }} />
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(slot._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <List>
                {appointments.map((appointment, index) => (
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
          <DialogTitle>Добавить время приема</DialogTitle>
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

