import React from 'react';
import { Navigate } from 'react-router-dom';
import { default as jwtDecode } from 'jwt-decode';  // Используем именованный импорт правильно

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const { role } = jwtDecode(token);  // Используем jwtDecode для декодирования токена
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default ProtectedRoute;
