const express = require('express');
const { google } = require('googleapis');
const router = express.Router();
const credentials = require('../credentials.json');

const oauth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Маршрут для перенаправления после аутентификации
router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  
  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Сохраните токены в сессии или базе данных
      // Например, req.session.tokens = tokens;
      
      res.redirect('/'); // Перенаправление пользователя на нужную страницу после успешной аутентификации
    } catch (error) {
      console.error('Error retrieving access token', error);
      res.status(500).send('Authentication failed');
    }
  } else {
    res.status(400).send('No authorization code found');
  }
});

module.exports = router;
