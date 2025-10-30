import { ROUTES } from '../constants/routes';


// obtiene la ruta del dashboard según los roles de usuario
export function getDashboardRoute(roles: string[]): string {
  if (roles.includes('ROLE_FARMER') || roles.includes('farmer')) {
    return ROUTES.DASHBOARD_FARMER;
  }
  
  if (roles.includes('ROLE_ADMINISTRATOR') || roles.includes('administrator')) {
    return ROUTES.DASHBOARD_ADMIN;
  }

  return ROUTES.DASHBOARD_FARMER; // default
}

// Redirige al dashboard segun el rol seleccionado
export function getDashboardByRole(role: string): string {
  return role === 'farmer' ? ROUTES.DASHBOARD_FARMER : ROUTES.DASHBOARD_ADMIN;
}
