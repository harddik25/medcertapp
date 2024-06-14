import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const { role } = decode(token);
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default ProtectedRoute;
