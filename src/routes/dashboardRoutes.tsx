import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../shared/constants/routes';
import FarmerDashboardPage from '../pages/dashboard/FarmerDashboardPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';
import FieldInformationPage from '../pages/field-info/FieldInformationPage';
import CropListPage from '../pages/crop-list/CropListPage';
import { CropDetailPage } from '../pages/crop-detail/CropDetailPage';
import { UserProfilePage } from '../pages/user-profile/UserProfilePage';
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
            {
                path: ROUTES.FIELD_INFO,
                element: (
                    <ProtectedRoute>
                        <FieldInformationPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.CROP_LIST,
                element: (
                    <ProtectedRoute>
                        <CropListPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.CROP_DETAIL,
                element: (
                    <ProtectedRoute>
                        <CropDetailPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.USER_PROFILE,
                element: (
                    <ProtectedRoute>
                        <UserProfilePage />
                    </ProtectedRoute>
                ),
            },
        ]
    }
];
