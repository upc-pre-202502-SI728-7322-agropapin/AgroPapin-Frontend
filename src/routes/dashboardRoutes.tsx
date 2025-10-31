import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../shared/constants/routes';
import FarmerDashboardPage from '../pages/dashboard/FarmerDashboardPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';
import MainLayout from "../shared/components/layouts/MainLayout.tsx";

//rutas protegidas del dashboard
export const dashboardRoutes: RouteObject[] = [
    {
        element: (
            <MainLayout></MainLayout>
        ),
        children: [
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
        ]
    }
];
