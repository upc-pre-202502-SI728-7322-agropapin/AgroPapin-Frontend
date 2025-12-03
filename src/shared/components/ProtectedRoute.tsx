import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../features/auth';
import { ROUTES } from '../constants/routes';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; 
}

// para proteger rutas que requieren autenticación, si no se encuentra autenticado redirige al login
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#3E7C59] mb-4"></div>
          <p className="text-gray-600 text-lg">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = user?.roles.some(role => allowedRoles.includes(role));
    
    if (!hasAllowedRole) {
      if (user?.roles.includes('ROLE_FARMER')) {
        return <Navigate to={ROUTES.DASHBOARD_FARMER} replace />;

      } else if (user?.roles.includes('ROLE_ADMINISTRATOR')) {
        return <Navigate to={ROUTES.DASHBOARD_ADMIN} replace />;
        
      }
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
  }

  return <>{children}</>;
}
