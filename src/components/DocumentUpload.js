import React, { useState } from 'react';
import { Container, Box, Typography, Button, CssBaseline, Paper, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import CannabisBackground from '../logos/cannabis-background.jpeg';
import { useNavigate } from 'react-router-dom';

const Background = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${CannabisBackground})`,
  backgroundSize: 'cover',
});

const documentTypes = [
  { value: 'NIE', label: 'NIE' },
  { value: 'DNI', label: 'DNI' },
  { value: 'PASSPORT', label: 'Passport' },
];

const DocumentUpload = () => {
  const [documentType, setDocumentType] = useState('');
  const [document, setDocument] = useState(null);
  const navigate = useNavigate();

  const handleDocumentChange = (event) => {
    setDocumentType(event.target.value);
  };

  const handleFileChange = (event) => {
    setDocument(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!documentType || !document) {
      alert('Please select a document type and upload a document.');
      return;
    }

    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('document', document);

    try {
      const response = await fetch('https://medlevel.me/api/documents/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        navigate('/main-survey');
      } else {
        alert('Error uploading document');
      }
    } catch (error) {
      console.error('Error uploading document', error);
      alert('Error uploading document');
    }
  };

  return (
    <Background>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onSubmit={handleSubmit}
          >
            <Typography component="h1" variant="h5" sx={{ color: '#388e3c', mb: 2 }}>
              Upload Document
            </Typography>
            <TextField
              select
              label="Document Type"
              value={documentType}
              onChange={handleDocumentChange}
              fullWidth
              sx={{ mb: 2 }}
            >
              {documentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2, backgroundColor: '#4caf50', color: '#fff' }}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#4caf50', color: '#fff' }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </Background>
  );
};

export default DocumentUpload;


