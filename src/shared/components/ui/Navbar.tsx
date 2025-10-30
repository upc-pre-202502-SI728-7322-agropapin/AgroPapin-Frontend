"use client"
import {ROUTES} from "../../constants/routes.ts";
import {Link, useLocation} from "react-router-dom";
import agropapinLogo from "../../../assets/agropapin.png"
import {useState} from "react";
import {CgProfile} from "react-icons/cg";


interface NavbarProps {
    userName?: string
}

export function Navbar({ userName }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const location=useLocation();

    const showSignUp = location.pathname === ROUTES.LOGIN;

    return (
        <nav className="bg-[#3E7C59] text-white px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to={ROUTES.HOME} className="flex items-center gap-2 hover:opacity-90 transition flex-shrink-0">
                    <img src={agropapinLogo} className="h-10" alt="Agrotech's logo"/>
                    <span className="font-bold text-xl hidden sm:inline ml-1">Agrotech</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                    {showSignUp && (
                        <Link
                            to={ROUTES.SIGNUP}
                            className="bg-white text-[#3E7C59] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Sign Up
                        </Link>
                    )}
                    <button className="text-white hover:opacity-80 transition">EN</button>

                    {userName && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center text-white font-bold">
                                <CgProfile size={30}/>
                            </div>
                            <span className="text-sm">{userName}</span>
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

                    {userName && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center text-white font-bold">
                                <CgProfile size={30}/>
                            </div>
                            <span className="text-sm">{userName}</span>
                        </div>
                    )}

                </div>
            )}
        </nav>
    )
}
