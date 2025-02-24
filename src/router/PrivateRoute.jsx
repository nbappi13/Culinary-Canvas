import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;