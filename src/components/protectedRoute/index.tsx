import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../features/userSlice';
import { Preloader } from '../ui';
import { Navigate } from 'react-router-dom';

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
  if (isLoading) return <Preloader />;
  if (protectionType === 'authRequired') {
    if (isAuthenticated) return children;
    else return <Navigate replace to='/login' />;
  }
  if (protectionType === 'noAuthRequired') {
    if (!isAuthenticated) return children;
    else return <Navigate replace to='/profile' />;
  }
};
