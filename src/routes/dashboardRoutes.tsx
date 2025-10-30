import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../shared/constants/routes';
import FarmerDashboardPage from '../pages/dashboard/FarmerDashboardPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';

//rutas protegidas del dashboard
export const dashboardRoutes: RouteObject[] = [
    {
        path: ROUTES.DASHBOARD_FARMER,
        element: (
            <ProtectedRoute>
                <FarmerDashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: ROUTES.DASHBOARD_ADMIN,
        element: (
            <ProtectedRoute>
                <AdminDashboardPage />
            </ProtectedRoute>
        ),
    },
];
