import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../shared/constants/routes';
import FarmerDashboardPage from '../pages/dashboard/FarmerDashboardPage';
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage';
import CreateCooperativePage from '../pages/cooperative/CreateCooperativePage';
import FieldInformationPage from '../pages/field-info/FieldInformationPage';
import CreateFieldPage from '../pages/field-info/CreateFieldPage';
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
import PlotListPage from '../pages/plot-list/PlotListPage.tsx';
import ManageMembersPage from '../pages/cooperative/ManageMembersPage.tsx';
import InventoryManagementPage from '../pages/inventory/InventoryManagementPage.tsx';

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
                path: ROUTES.CREATE_COOPERATIVE,
                element: (
                    <ProtectedRoute allowedRoles={['ROLE_ADMINISTRATOR']}>
                        <CreateCooperativePage />
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
                path: ROUTES.CREATE_FIELD,
                element: (
                    <ProtectedRoute>
                        <CreateFieldPage />
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
                path: '/plots/:plotId/devices',
                element: (
                    <ProtectedRoute>
                        <DevicesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/plots/:plotId/devices/details/:deviceId',
                element: (
                    <ProtectedRoute>
                        <DeviceDetailsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/plots/:plotId/devices/readings/:deviceId',
                element: (
                    <ProtectedRoute>
                        <AllReadingsPage />
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
            {
                path: ROUTES.PLOT_LIST,
                element: (
                    <ProtectedRoute>
                        <PlotListPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.MANAGE_MEMBERS,
                element: (
                    <ProtectedRoute allowedRoles={['ROLE_ADMINISTRATOR']}>
                        <ManageMembersPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: ROUTES.INVENTORY,
                element: (
                    <ProtectedRoute allowedRoles={['ROLE_ADMINISTRATOR']}>
                        <InventoryManagementPage />
                    </ProtectedRoute>
                ),
            }
        ]
    }
];
