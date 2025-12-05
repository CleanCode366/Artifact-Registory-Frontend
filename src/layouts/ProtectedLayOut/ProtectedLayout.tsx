

// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/wellcome" replace />;
  }
  return <>{children}</>;
};


// components/PublicRoute.tsx

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/feed" replace />;
  }
  return <>{children}</>;
};

export { ProtectedRoute, PublicRoute };

// Updated Navbar.tsx


// Updated MainRoutes.tsx
