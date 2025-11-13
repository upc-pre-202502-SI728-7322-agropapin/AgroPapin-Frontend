import type {RouteObject} from "react-router-dom";
import AuthLayout from "../shared/components/layouts/AuthLayout";
import {ROUTES} from "../shared/constants/routes.ts";
import LoginPage from "../pages/auth/LoginPage.tsx"

// sin protección, ya que el token no existe aún
export const authRoutes: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            {
                path: ROUTES.LOGIN,
                element:<LoginPage/>
            }
        ]
    }
];