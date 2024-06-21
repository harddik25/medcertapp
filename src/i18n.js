import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Переводы
const resources = {
  en: {
    translation: {
      "Welcome": "Welcome",
      "Video Consultation": "Video Consultation",
      "Date": "Date",
      "Time": "Time",
      "Book": "Book",
      "Sorry, no available slots at the moment": "Sorry, no available slots at the moment",
      "Success! Your appointment is booked at": "Success! Your appointment is booked at",
      "Back": "Back",
      "Client Information": "Client Information",
      "Survey Answers": "Survey Answers",
      "Question": "Question",
      "Answer": "Answer",
      "Download Front Side": "Download Front Side",
      "Download Back Side": "Download Back Side",
      "Name": "Name",
      "Pathologies": "Pathologies",
      "No": "No"
      "User Profile": "User Profile",
      "Welcome": "Welcome",
      "Admin Panel": "Admin Panel",
      "Doctor Panel": "Doctor Panel",
      "Your consultation appointment is on": "Your consultation appointment is on",
      "Join Consultation": "Join Consultation",
      "About Certificate": "About Certificate",
      "View Certificate": "View Certificate",
      "Status": "Status",
      "Buy Certificate": "Buy Certificate",
      "You can join the consultation only 15 minutes before its start": "You can join the consultation only 15 minutes before its start"
    }
  },
  es: {
    translation: {
      "Welcome": "Bienvenido",
      "Video Consultation": "Consulta de video",
      "Date": "Fecha",
      "Time": "Hora",
      "Book": "Reservar",
      "Sorry, no available slots at the moment": "Lo sentimos, no hay citas disponibles en este momento",
      "Success! Your appointment is booked at": "¡Éxito! Tu cita está reservada a las",
      "Back": "Atrás",
      "Client Information": "Información del cliente",
      "Survey Answers": "Respuestas de la encuesta",
      "Question": "Pregunta",
      "Answer": "Respuesta",
      "Download Front Side": "Descargar lado frontal",
      "Download Back Side": "Descargar lado posterior",
      "Name": "Nombre",
      "Pathologies": "Patologías",
      "No": "No"
      "User Profile": "Perfil de usuario",
      "Welcome": "Bienvenido",
      "Admin Panel": "Panel de administración",
      "Doctor Panel": "Panel del doctor",
      "Your consultation appointment is on": "Su cita de consulta es el",
      "Join Consultation": "Unirse a la consulta",
      "About Certificate": "Sobre el certificado",
      "View Certificate": "Ver certificado",
      "Status": "Estado",
      "Buy Certificate": "Comprar certificado",
      "You can join the consultation only 15 minutes before its start": "Puede unirse a la consulta solo 15 minutos antes de su inicio"
    }
    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
