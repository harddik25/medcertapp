
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CssBaseline, List, ListItem, ListItemText, Button, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CannabisBackground from './cannabis-background.webp';
import BackImage from './back.webp';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

const DoctorPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [freeSlots, setFreeSlots] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetchFreeSlots();
  }, []);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

const handleSave = async () => {
  if (!date || !time) {
    alert(t('Date and time are required'));
    return;
  }

  const formattedDate = formatDate(date);

  try {
    const response = await fetch('https://medlevel.me/api/consultations/add-free-slot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: formattedDate, time }),
    });
    const data = await response.json();
    if (data.success) {
      setFreeSlots([...freeSlots, { date: formattedDate, time }]);
      setOpen(false);
    } else {
      console.error('Ошибка при сохранении свободного времени');
    }
  } catch (error) {
    console.error('Ошибка при сохранении свободного времени', error);
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

  const handleViewClientInfo = (patientId) => {
    navigate(`/doctor/client-info/${patientId}`);
  };

  const handleBackClick = () => {
    navigate('/profile');
  };

  return (
    <Background>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Header>
            <IconButton onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
              <img src={BackImage} alt="Back" style={{ width: '30px', height: '30px' }} />
            </IconButton>
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c', flexGrow: 1, textAlign: 'center' }}>
              {t('Doctor Panel')}
            </Typography>
            <LanguageSwitcher />
          </Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mt: 1, width: '100%' }}>
              <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mb: 2 }}>
                {t('Add Free Slot')}
              </Button>
              <Button variant="contained" color="secondary" sx={{ mb: 2 }} onClick={fetchFutureAppointments}>
                {t('Future Appointments')}
              </Button>
              <Typography variant="h6" sx={{ mt: 2, color: '#388e3c' }}>
                {t('Free Dates')}
              </Typography>
              <List>
                {freeSlots.map((slot, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${slot.date} ${slot.time}`}
                      sx={{ color: '#388e3c' }}
                    />
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSlot(slot._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" sx={{ mt: 2, color: '#388e3c' }}>
                {t('Future Appointments')}
              </Typography>
              <List>
                {futureAppointments.map((appointment, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${appointment.date} ${appointment.time}`}
                      secondary={`${t('Patient')}: ${appointment.patientName || t('No appointments available')}`}
                      sx={{ color: '#388e3c' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewClientInfo(appointment.patientName)}
                      sx={{ ml: 2 }}
                    >
                      {t('View Client Info')}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Paper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t('Add Free Slot for Appointment')}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label={t('Date')}
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
              label={t('Time')}
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
              {t('Cancel')}
            </Button>
            <Button onClick={handleSave} color="primary">
              {t('Save')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Background>
  );
};

export default DoctorPanel;


