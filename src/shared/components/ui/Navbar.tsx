"use client"
import {ROUTES} from "../../constants/routes.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import agropapinLogo from "../../../assets/agropapin.png"
import {useState, useEffect, useRef} from "react";
import {CgProfile} from "react-icons/cg";
import {useAuth} from "../../../features/auth/context/AuthContext.tsx";
import {getDashboardRoute} from "../../utils/navigation.ts";
import { useTranslation } from 'react-i18next';


export function Navbar() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef<HTMLDivElement>(null)
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // si esta en la ruta de autenticación no se muestra el botón de dashboard ni el perfil
    const isAuthRoute = location.pathname === ROUTES.LOGIN;
    const showUserElements = user && !isAuthRoute;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }

        if (isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileOpen]);

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
                            {t('nav.dashboard')}
                        </button>
                    )}
                    
                    <button 
                        onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
                        className="text-white hover:opacity-80 transition font-semibold"
                    >
                        {i18n.language === 'es' ? 'ES' : 'EN'}
                    </button>

                    {showUserElements && (
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 hover:opacity-80 transition"
                            >
                                <div className="flex items-center justify-center text-white rounded-full font-bold p-1">
                                    <CgProfile size={35}/>
                                </div>
                                <span className="text-sm font-medium">
                                    {user.firstName && user.lastName 
                                        ? `${user.firstName} ${user.lastName}`
                                        : user.email?.split('@')[0]}
                                </span>
                                <svg 
                                    className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <button
                                        onClick={() => {
                                            navigate(ROUTES.USER_PROFILE);
                                            setIsProfileOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                        <CgProfile size={20} />
                                        {t('nav.profile')}
                                    </button>
                                    <hr className="my-1" />
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsProfileOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        {t('nav.logout')}
                                    </button>
                                </div>
                            )}
                        </div>
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
                            className="block w-full bg-white text-[#3E7C59] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-center">
                            {t('nav.dashboard')}
                        </button>
                    )}
                    
                    <button 
                        onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
                        className="w-full text-left px-4 py-2 text-white hover:opacity-80 transition font-semibold"
                    >
                        {i18n.language === 'es' ? 'ES' : 'EN'}
                    </button>

                    {showUserElements && (
                        <>
                            <button 
                                onClick={() => {
                                    navigate(ROUTES.USER_PROFILE);
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-2 px-4 py-2 hover:opacity-80 transition">
                                <div className="flex items-center justify-center bg-white text-[#3E7C59] rounded-full w-10 h-10 font-bold">
                                    <CgProfile size={24}/>
                                </div>
                                <span className="text-sm font-medium">
                                    {user.firstName && user.lastName 
                                        ? `${user.firstName} ${user.lastName}`
                                        : user.email?.split('@')[0]}
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                                className="block w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition text-center flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {t('nav.logout')}
                            </button>
                        </>
                    )}

                </div>
            )}
        </nav>
    )
}
