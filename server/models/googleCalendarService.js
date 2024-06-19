const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const credentials = require('../credentials.json');

const oAuth2Client = new OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Установите токен доступа
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const createGoogleMeetLink = async (date, time, summary) => {
  const event = {
    summary: summary,
    start: {
      dateTime: `${date}T${time}:00`,
      timeZone: 'UTC'
    },
    end: {
      dateTime: `${date}T${parseInt(time) + 1}:00`,
      timeZone: 'UTC'
    },
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' }
      }
    }
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1
    });

    const meetLink = response.data.hangoutLink;
    return meetLink;
  } catch (error) {
    console.error('Error creating Google Meet link:', error);
    throw new Error('Failed to create Google Meet link');
  }
};

module.exports = {
  createGoogleMeetLink
};
