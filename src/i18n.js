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
      "First Name": "First Name",
      "Last Name": "Last Name",
      "Pathology": "Pathology",
      "IN GENERAL, WOULD YOU SAY THAT YOUR HEALTH IS:": "IN GENERAL, WOULD YOU SAY THAT YOUR HEALTH IS:",
      "Excellent": "Excellent",
      "Very good": "Very good",
      "Good": "Good",
      "Fair": "Fair",
      "Poor": "Poor",
      "COMPARING IT WITH THE ONE OF A YEAR AGO:": "COMPARING IT WITH THE ONE OF A YEAR AGO:",
      "Much better now than a year ago": "Much better now than a year ago",
      "Somewhat worse now than a year ago": "Somewhat worse now than a year ago",
      "Same as a year ago": "Same as a year ago",
      "Much worse now than a year ago": "Much worse now than a year ago",
      "The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?": "The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?",
      "Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports.": "Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports.",
      "Moderate activities, such as moving a table, pushing a vacuum, go bowling or play golf.": "Moderate activities, such as moving a table, pushing a vacuum, go bowling or play golf.",
      "Lifting weight or carrying food.": "Lifting weight or carrying food.",
      "Climb several flights of stairs.": "Climb several flights of stairs.",
      "Up a flight of stairs.": "Up a flight of stairs.",
      "Bend, kneel, or stoop.": "Bend, kneel, or stoop.",
      "Walking more than a kilometer.": "Walking more than a kilometer.",
      "Walking several blocks.": "Walking several blocks.",
      "Walking one block.": "Walking one block.",
      "Bathing or dressing.": "Bathing or dressing.",
      "During the last 4 weeks, have you had any of the following problems with your work or other normal daily activities as a result of your physical health?": "During the last 4 weeks, have you had any of the following problems with your work or other normal daily activities as a result of your physical health?",
      "I have reduced the time I spend at work or other activities": "I have reduced the time I spend at work or other activities",
      "I have accomplished less than I would like": "I have accomplished less than I would like",
      "I had some limitation in work or other activities": "I had some limitation in work or other activities",
      "I had difficulty and required an extra effort": "I had difficulty and required an extra effort",
      "During the last 4 weeks, have you had any of the following problems at work or with other usual daily activities as a result of an emotional problem (such as feeling depressed or anxious)?": "During the last 4 weeks, have you had any of the following problems at work or with other usual daily activities as a result of an emotional problem (such as feeling depressed or anxious)?",
      "I have reduced the amount of time I spend at work or doing other activities.": "I have reduced the amount of time I spend at work or doing other activities.",
      "I have accomplished less than I would like.": "I have accomplished less than I would like.",
      "I did not do work or other activities as carefully as usual.": "I did not do work or other activities as carefully as usual.",
      "During the past 4 weeks, to what extent have your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?": "During the past 4 weeks, to what extent have your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?",
      "No way.": "No way.",
      "Slightly.": "Slightly.",
      "Moderately.": "Moderately.",
      "Quite.": "Quite.",
      "Extremely.": "Extremely.",
      "How much body pain have you had in the last 4 weeks?": "How much body pain have you had in the last 4 weeks?",
      "Nothing": "Nothing",
      "Very soft.": "Very soft.",
      "Soft.": "Soft.",
      "Moderate.": "Moderate.",
      "Severe.": "Severe.",
      "Very severe.": "Very severe.",
      "During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?": "During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?",
      "No way.": "No way.",
      "Slightly.": "Slightly.",
      "Moderately.": "Moderately.",
      "Quite.": "Quite.",
      "Extremely.": "Extremely.",
      "These questions are about how you are feeling and how things have been going for you in the last 4 weeks. For each question, please give the answer that is closest to how you felt.": "These questions are about how you are feeling and how things have been going for you in the last 4 weeks. For each question, please give the answer that is closest to how you felt.",
      "Did you feel full of energy?": "Did you feel full of energy?",
      "Were you very nervous?": "Were you very nervous?",
      "Have you felt so low that nothing could cheer you up?": "Have you felt so low that nothing could cheer you up?",
      "Have you felt calm and at peace?": "Have you felt calm and at peace?",
      "Did you have a lot of energy?": "Did you have a lot of energy?",
      "Have you felt downhearted and blue?": "Have you felt downhearted and blue?",
      "Did you feel exhausted?": "Did you feel exhausted?",
      "Have you been a happy person?": "Have you been a happy person?",
      "Did you feel tired?": "Did you feel tired?",
      "During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?": "During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?",
      "How much of the time during the last 4 weeks?": "How much of the time during the last 4 weeks?",
      "I seem to get sick a little more than other people.": "I seem to get sick a little more than other people.",
      "I am as healthy as anyone you know.": "I am as healthy as anyone you know.",
      "I hope my health gets worse.": "I hope my health gets worse.",
      "My health is excellent.": "My health is excellent.",
      "Continue": "Continue",
      "Please fill out all fields.": "Please fill out all fields."
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
      "First Name": "Nombre",
      "Last Name": "Apellido",
      "Pathology": "Patología",
      "IN GENERAL, WOULD YOU SAY THAT YOUR HEALTH IS:": "EN GENERAL, ¿DIRÍA QUE SU SALUD ES:",
      "Excellent": "Excelente",
      "Very good": "Muy bueno",
      "Good": "Bueno",
      "Fair": "Regular",
      "Poor": "Pobre",
      "COMPARING IT WITH THE ONE OF A YEAR AGO:": "COMPARÁNDOLA CON LA DE HACE UN AÑO:",
      "Much better now than a year ago": "Mucho mejor ahora que hace un año",
      "Somewhat worse now than a year ago": "Algo peor ahora que hace un año",
      "Same as a year ago": "Igual que hace un año",
      "Much worse now than a year ago": "Mucho peor ahora que hace un año",
      "The following articles are about activities you can do during a typical day. Does your health now limit you in these activities? If so, how much?": "Los siguientes artículos tratan sobre actividades que puede realizar durante un día típico. ¿Su salud le limita en estas actividades? Si es así, ¿cuánto?",
      "Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports.": "Actividades vigorosas, como correr, levantar objetos pesados, participar en deportes extenuantes.",
      "Moderate activities, such as moving a table, pushing a vacuum, go bowling or play golf.": "Actividades moderadas, como mover una mesa, pasar la aspiradora, jugar a los bolos o al golf.",
      "Lifting weight or carrying food.": "Levantar peso o llevar comida.",
      "Climb several flights of stairs.": "Subir varios tramos de escaleras.",
      "Up a flight of stairs.": "Subir un tramo de escaleras.",
      "Bend, kneel, or stoop.": "Doblarse, arrodillarse o agacharse.",
      "Walking more than a kilometer.": "Caminar más de un kilómetro.",
      "Walking several blocks.": "Caminar varias cuadras.",
      "Walking one block.": "Caminar una cuadra.",
      "Bathing or dressing.": "Bañarse o vestirse.",
      "During the last 4 weeks, have you had any of the following problems with your work or other normal daily activities as a result of your physical health?": "Durante las últimas 4 semanas, ¿ha tenido alguno de los siguientes problemas con su trabajo u otras actividades diarias normales como resultado de su salud física?",
      "I have reduced the time I spend at work or other activities": "He reducido el tiempo que dedico al trabajo u otras actividades",
      "I have accomplished less than I would like": "He logrado menos de lo que me gustaría",
      "I had some limitation in work or other activities": "Tuve alguna limitación en el trabajo u otras actividades",
      "I had difficulty and required an extra effort": "Tuve dificultad y requirió un esfuerzo adicional",
      "During the last 4 weeks, have you had any of the following problems at work or with other usual daily activities as a result of an emotional problem (such as feeling depressed or anxious)?": "Durante las últimas 4 semanas, ¿ha tenido alguno de los siguientes problemas en el trabajo o con otras actividades diarias habituales como resultado de un problema emocional (como sentirse deprimido o ansioso)?",
      "I have reduced the amount of time I spend at work or doing other activities.": "He reducido la cantidad de tiempo que paso en el trabajo o haciendo otras actividades.",
      "I have accomplished less than I would like.": "He logrado menos de lo que me gustaría.",
      "I did not do work or other activities as carefully as usual.": "No hice el trabajo u otras actividades con tanto cuidado como de costumbre.",
      "During the past 4 weeks, to what extent have your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?": "Durante las últimas 4 semanas, ¿hasta qué punto sus problemas de salud física o emocional han interferido con sus actividades sociales normales con familiares, amigos, vecinos o grupos?",
      "No way.": "De ninguna manera.",
      "Slightly.": "Ligeramente.",
      "Moderately.": "Moderadamente.",
      "Quite.": "Bastante.",
      "Extremely.": "Extremadamente.",
      "How much body pain have you had in the last 4 weeks?": "¿Cuánto dolor corporal ha tenido en las últimas 4 semanas?",
      "Nothing": "Nada",
      "Very soft.": "Muy suave.",
      "Soft.": "Suave.",
      "Moderate.": "Moderado.",
      "Severe.": "Severo.",
      "Very severe.": "Muy severo.",
      "During the last 4 weeks, how much did pain interfere with your normal work (including both work outside the home and at home)?": "Durante las últimas 4 semanas, ¿cuánto interfirió el dolor con su trabajo normal (incluido el trabajo fuera de casa y en casa)?",
      "No way.": "De ninguna manera.",
      "Slightly.": "Ligeramente.",
      "Moderately.": "Moderadamente.",
      "Quite.": "Bastante.",
      "Extremely.": "Extremadamente.",
      "These questions are about how you are feeling and how things have been going for you in the last 4 weeks. For each question, please give the answer that is closest to how you felt.": "Estas preguntas son sobre cómo se siente y cómo le han ido las cosas en las últimas 4 semanas. Para cada pregunta, por favor dé la respuesta que más se acerque a cómo se sintió.",
      "Did you feel full of energy?": "¿Se sintió lleno de energía?",
      "Were you very nervous?": "¿Estuvo muy nervioso?",
      "Have you felt so low that nothing could cheer you up?": "¿Se ha sentido tan deprimido que nada podía animarlo?",
      "Have you felt calm and at peace?": "¿Se ha sentido tranquilo y en paz?",
      "Did you have a lot of energy?": "¿Tuvo mucha energía?",
      "Have you felt downhearted and blue?": "¿Se ha sentido desanimado y triste?",
      "Did you feel exhausted?": "¿Se sintió exhausto?",
      "Have you been a happy person?": "¿Ha sido una persona feliz?",
      "Did you feel tired?": "¿Se sintió cansado?",
      "During the past 4 weeks, how much of the time has your physical health or emotional problems interfered with your social activities (such as visiting with friends, relatives, etc.)?": "Durante las últimas 4 semanas, ¿cuánto tiempo han interferido sus problemas de salud física o emocional con sus actividades sociales (como visitar a amigos, familiares, etc.)?",
      "How much of the time during the last 4 weeks?": "¿Cuánto tiempo durante las últimas 4 semanas?",
      "I seem to get sick a little more than other people.": "Parece que me enfermo un poco más que otras personas.",
      "I am as healthy as anyone you know.": "Soy tan saludable como cualquier persona que conozcas.",
      "I hope my health gets worse.": "Espero que mi salud empeore.",
      "My health is excellent.": "Mi salud es excelente.",
      "Continue": "Continuar",
      "Please fill out all fields.": "Por favor, complete todos los campos."
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
