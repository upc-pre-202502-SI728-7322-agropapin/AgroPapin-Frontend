import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from "../../features/auth";
import { useAuth } from "../../features/auth";
import { CgProfile } from "react-icons/cg";
import { ROUTES } from '../../shared/constants/routes';

export default function LoginPage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    // si ya se autentico lo redirige a su dashbaord
    useEffect(() => {
        if (!isLoading && isAuthenticated && user) {
            
            if (user.roles.includes('ROLE_FARMER')) {
                navigate(ROUTES.DASHBOARD_FARMER, { replace: true });

            } else if (user.roles.includes('ROLE_ADMINISTRATOR')) {
                navigate(ROUTES.DASHBOARD_ADMIN, { replace: true });

            } else {
                console.warn('Usuario no tiene rol:', user.roles);
            }
        } else {
            console.log('esperando autenticación');
        }
    }, [isLoading, isAuthenticated, user, navigate]);

    // carga mientras se verifica la autenticación
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#3E7C59] mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                    <div className="flex items-center flex-col text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign-in</h1>
                        <CgProfile size={50}/>
                    </div>

                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}