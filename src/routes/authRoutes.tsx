import type {RouteObject} from "react-router-dom";
import AuthLayout from "../shared/components/layouts/AuthLayout";
import {ROUTES} from "../shared/constants/routes.ts";
import LoginPage from "../pages/auth/LoginPage.tsx"
import SignInPage from "../pages/auth/SignInPage.tsx"

export const authRoutes: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            {
                path: ROUTES.LOGIN,
                element:<LoginPage/>
            },
            {
                path:ROUTES.SIGNUP,
                element:<SignInPage/>
            }
        ]
    }
];