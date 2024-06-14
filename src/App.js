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
import WebSocketComponent from './components/WebSocketComponent';
import CertificateInfo from './components/CertificateInfo';
import Agreement from './components/Agreement';
import DocumentUpload from './components/DocumentUpload';
import MainSurvey from './components/MainSurvey'; // создайте этот компонент аналогично другим

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Устанавливаем время загрузки 2 секунды (2000 мс)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <WebSocketComponent />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/language" element={<LanguageSelection />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/doctor" element={<DoctorPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/certificate-info" element={<CertificateInfo />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/main-survey" element={<MainSurvey />} /> {/* создайте этот компонент */}
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;


