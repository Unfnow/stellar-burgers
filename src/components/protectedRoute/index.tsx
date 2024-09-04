import React, { ReactNode } from 'react';
import { selectAuthState } from '../../features/userSlice';
import { Preloader } from '../ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactNode;
  protectionType?: 'authRequired' | 'noAuthRequired';
};

export const ProtectedRoute = ({
  children,
  protectionType = 'authRequired'
}: ProtectedRouteProps) => {
  const { email, error, isLoading, name } = useSelector(selectAuthState);
  const isAuthenticated = email && name && !isLoading;
  const location = useLocation();
  const from = location.state?.from || '/';
  if (isLoading) return <Preloader />;
  if (protectionType === 'authRequired') {
    if (isAuthenticated) return children;
    else return <Navigate to='/login' state={{ from: location }} />;
  }
  if (protectionType === 'noAuthRequired') {
    if (!isAuthenticated) return children;
    else return <Navigate to={from} />;
  }
};
