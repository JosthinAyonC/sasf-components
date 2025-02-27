import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '../store/store';

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: 'ADMIN' | 'USER' | 'MANTAINER';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, roles } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (requiredRole && roles) {
    const isvalidRol = roles.some((rol) => {
      return rol === requiredRole;
    });

    if (!isvalidRol) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default PrivateRoute;
