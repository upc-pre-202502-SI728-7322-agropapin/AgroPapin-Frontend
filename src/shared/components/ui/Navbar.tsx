"use client"
import {ROUTES} from "../../constants/routes.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import agropapinLogo from "../../../assets/agropapin.png"
import {useState} from "react";
import {CgProfile} from "react-icons/cg";
import {useAuth} from "../../../features/auth/context/AuthContext.tsx";
import {getDashboardRoute} from "../../utils/navigation.ts";


export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const showSignUp = location.pathname === ROUTES.LOGIN;
    
    // si esta en la ruta de autenticación o onboarding no se muestra el botón de dashboard ni el perfil
    const isAuthRoute = location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.SIGNUP;
    const isOnboardingRoute = location.pathname.startsWith('/onboarding');
    const showUserElements = user && !isAuthRoute && !isOnboardingRoute;

    const handleDashboardClick = () => {
        if (user?.roles) {
            const dashboardPath = getDashboardRoute(user.roles);
            navigate(dashboardPath);
        }
    };

    return (
        <nav className="bg-[#3E7C59] text-white px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to={ROUTES.HOME} className="flex items-center gap-2 hover:opacity-90 transition flex-shrink-0">
                    <img src={agropapinLogo} className="h-10" alt="Agrotech's logo"/>
                    <span className="font-bold text-xl hidden sm:inline ml-1">Agrotech</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    {/* Dashboard Button */}
                    {showUserElements && (
                        <button
                            onClick={handleDashboardClick}
                            className="bg-white text-[#3E7C59] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Dashboard
                        </button>
                    )}
                    
                    {showSignUp && (
                        <Link
                            to={ROUTES.SIGNUP}
                            className="bg-white text-[#3E7C59] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Sign Up
                        </Link>
                    )}
                    <button className="text-white hover:opacity-80 transition">EN</button>

                    {showUserElements && (
                        <button 
                            onClick={() => navigate(ROUTES.USER_PROFILE)}
                            className="flex items-center gap-2 hover:opacity-80 transition mr-1"
                        >
                            <div className="flex items-center justify-center text-white rounded-full font-bold p-1">
                                <CgProfile size={35}/>
                            </div>
                            <span className="text-sm font-medium">
                                {user.firstName && user.lastName 
                                    ? `${user.firstName} ${user.lastName}`
                                    : user.email?.split('@')[0]}
                            </span>
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}></div>
                    <div className={`w-6 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}></div>
                    <div className={`w-6 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-green-800 pt-4">
                    {/* Dashboard Button Mobile */}
                    {showUserElements && (
                        <button
                            onClick={() => {
                                handleDashboardClick();
                                setIsOpen(false);
                            }}
                            className="block w-full bg-white text-[#3E7C59] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
                        >
                            Dashboard
                        </button>
                    )}
                    
                    {showSignUp && (
                        <Link
                            to={ROUTES.SIGNUP}
                            className="block bg-white text-[#3E7C59] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign Up
                        </Link>
                    )}
                    <button className="w-full text-left px-4 py-2 text-white hover:opacity-80 transition">EN</button>

                    {showUserElements && (
                        <button 
                            onClick={() => {
                                navigate(ROUTES.USER_PROFILE);
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 hover:opacity-80 transition"
                        >
                            <div className="flex items-center justify-center bg-white text-[#3E7C59] rounded-full w-10 h-10 font-bold">
                                <CgProfile size={24}/>
                            </div>
                            <span className="text-sm font-medium">
                                {user.firstName && user.lastName 
                                    ? `${user.firstName} ${user.lastName}`
                                    : user.email?.split('@')[0]}
                            </span>
                        </button>
                    )}

                </div>
            )}
        </nav>
    )
}
