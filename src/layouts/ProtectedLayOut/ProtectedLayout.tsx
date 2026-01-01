// components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/utils/auth';
import CircularProgess from '@components/Spinner/CircularProgess';
import { useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// components/PublicRoute.tsx

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = isAuthenticated();

  if (isAuth) {
    return <Navigate to="/feed" replace />;
  }

  return <>{children}</>;
};

// export { ProtectedRoute, PublicRoute };