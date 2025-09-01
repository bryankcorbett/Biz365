import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../constants';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login with next parameter
  if (!isAuthenticated) {
    return <Navigate to={`${ROUTES.LOGIN}?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
