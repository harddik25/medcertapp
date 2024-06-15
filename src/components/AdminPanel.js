import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CannabisBackground from './cannabis-background.webp';

const theme = createTheme();

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
  paddingTop: '20px',
  paddingBottom: '20px',
});

const roles = [
  { value: 'user', label: 'User' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'admin', label: 'Admin' },
];

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://medlevel.me/api/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async () => {
    if (selectedUser && selectedRole) {
      await fetch(`https://medlevel.me/api/users/${selectedUser}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: selectedRole }),
      });
      alert('Role updated successfully');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ color: '#388e3c', marginBottom: 2 }}>
                Admin Panel
              </Typography>
              <TextField
                select
                label="Select User"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.firstName} {user.lastName} ({user.username})
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Select Role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {roles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
                onClick={handleRoleChange}
              >
                Update Role
              </Button>
            </Box>
          </Paper>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default AdminPanel;
