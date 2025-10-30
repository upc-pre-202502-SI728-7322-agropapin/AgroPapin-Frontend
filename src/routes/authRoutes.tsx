import type {RouteObject} from "react-router-dom";
import AuthLayout from "../shared/components/layouts/AuthLayout";
import {ROUTES} from "../shared/constants/routes.ts";
import LoginPage from "../pages/auth/LoginPage.tsx"
import SignUpPage from "../pages/auth/SignUpPage.tsx"
import {RolePage} from "../pages/onboarding/RolePage.tsx";
import PlanPage from "../pages/onboarding/PlanPage.tsx";
import {PaymentPage} from "../pages/onboarding/PaymentPage.tsx";
import {OnboardingProvider} from "../features/auth/context/OnboardingContext.tsx";


export const authRoutes: RouteObject[] = [
    {
        element: (
            <OnboardingProvider>
                <AuthLayout />
            </OnboardingProvider>

        ),
        children: [
            {
                path: ROUTES.LOGIN,
                element:<LoginPage/>
            },
            {
                path:ROUTES.SIGNUP,
                element:<SignUpPage/>
            },
            {
                path:ROUTES.ONBOARDING.ROLE,
                element:<RolePage/>
            },
            {
                path: ROUTES.ONBOARDING.PLAN,
                element:<PlanPage/>
            },
            {
                path:ROUTES.ONBOARDING.PAYMENT,
                element:<PaymentPage/>
            }

        ]
    }
];