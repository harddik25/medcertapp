import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Certificate from './components/Certificate';
import Consultation from './components/Consultation';
import DoctorPanel from './components/DoctorPanel';
import AdminPanel from './components/AdminPanel';
import LoadingPage from './components/LoadingPage';
import LanguageSelection from './components/LanguageSelection';
import SurveyForm from './components/SurveyForm';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Устанавливаем время загрузки 2 секунды (2000 мс)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Создаем новое WebSocket соединение
    const ws = new WebSocket('wss://medlevel.me/ws');

    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send('Hello Server!');
    };

    ws.onmessage = (event) => {
      console.log('Message from server ', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Очищаем соединение при размонтировании компонента
    return () => {
      ws.close();
    };
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/language" element={<LanguageSelection />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/doctor" element={<DoctorPanel />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/survey" element={<SurveyForm />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;


