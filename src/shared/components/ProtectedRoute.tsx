import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import { ROUTES } from '../constants/routes';
import type { ReactNode } from 'react';

// para proteger rutas que requieren autenticación, si no se encuentra autenticado redirige al login
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
