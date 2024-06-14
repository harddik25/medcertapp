import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';  // Используйте именованный импорт без фигурных скобок

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const { role } = jwtDecode(token);  // Используем jwtDecode вместо decode
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default ProtectedRoute;
