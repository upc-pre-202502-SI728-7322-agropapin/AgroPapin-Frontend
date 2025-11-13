import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../shared/constants/routes';
import FarmerDashboardPage from '../pages/dashboard/FarmerDashboardPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';
import FieldInformationPage from '../pages/field-info/FieldInformationPage';
import CropListPage from '../pages/crop-list/CropListPage';
import { CropDetailPage } from '../pages/crop-detail/CropDetailPage';
import DevicesPage from '../pages/devices/DevicesPage';
import DeviceDetailsPage from '../pages/devices/DeviceDetailsPage';
import AllReadingsPage from '../pages/devices/AllReadingsPage';
import { UserProfilePage } from '../pages/user-profile/UserProfilePage';
import ChatPage from '../pages/chat/ChatPage';
import IrrigationControlPage from '../pages/irrigation-control/IrrigationControlPage';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';
import MainLayout from "../shared/components/layouts/MainLayout.tsx";

//rutas protegidas del dashboard
export const dashboardRoutes: RouteObject[] = [
    {
        path: '/',
        element: (
            <MainLayout></MainLayout>
        ),
        children: [
            {
                path: ROUTES.DASHBOARD_FARMER,
                element: (
                    <ProtectedRoute allowedRoles={['ROLE_FARMER']}>
                        <FarmerDashboardPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.DASHBOARD_ADMIN,
                element: (
                    <ProtectedRoute allowedRoles={['ROLE_ADMINISTRATOR']}>
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
                path: ROUTES.DEVICES,
                element: <DevicesPage />,
            },
            {
                path: '/devices/:cropId/details/:deviceId',
                element: <DeviceDetailsPage />,
            },
            {
                path: '/devices/:cropId/readings/:deviceId',
                element: <AllReadingsPage />,
            },
            {
                path: ROUTES.USER_PROFILE,
                element: (
                    <ProtectedRoute>
                        <UserProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.CHAT,
                element: (
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.IRRIGATION_CONTROL,
                element: (
                    <ProtectedRoute>
                        <IrrigationControlPage />
                    </ProtectedRoute>
                ),
            },
        ]
    }
];
