import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import { getDashboardRoute } from '../utils/navigation';
import type { ReactNode } from 'react';

export function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isAuthenticated && user) {
    const dashboard = getDashboardRoute(user.roles);
    return <Navigate to={dashboard} replace />;
  }

  return <>{children}</>;
}
