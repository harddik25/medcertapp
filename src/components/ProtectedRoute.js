import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('telegramUser'));

  console.log('ProtectedRoute - User:', user); // Отладочное сообщение
  console.log('Allowed roles:', allowedRoles); // Отладочное сообщение

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default ProtectedRoute;
