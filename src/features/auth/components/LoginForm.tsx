"use client"

import { ROUTES } from "../../../shared/constants/routes"
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function LoginForm() {
    const { loginWithRedirect } = useAuth0();

    const handleSignUpFarmer = async () => {
        await loginWithRedirect({
            authorizationParams: {
                custom_role: 'ROLE_FARMER', 
                audience: 'https://agropapin-api' 
            }
        });

        // TODO: MANEJAR ERRORES Y LLEGADA DE DATOS DEL TOKEN PARA REDIRECCIONAR A DASHBOARD SEGUN ROL
    };

    const handleSignUpAdministrator = async () => {
        await loginWithRedirect({
            authorizationParams: {
                custom_role: 'ROLE_ADMINISTRATOR',
                audience: 'https://agropapin-api'
            }
        });
        
        // TODO: MANEJAR ERRORES Y LLEGADA DE DATOS DEL TOKEN PARA REDIRECCIONAR A DASHBOARD SEGUN ROL
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Selecciona tu tipo de cuenta</h2>
                <p className="text-gray-600">Elige cómo quieres registrarte en nuestra plataforma</p>
            </div>

            <div className="grid gap-4">
                <button
                    onClick={handleSignUpAdministrator}
                    type="button"
                    className="w-full bg-[#3E7C59] text-white py-4 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Registrarme como Administrador
                </button>

                <button
                    onClick={handleSignUpFarmer}
                    type="button"
                    className="w-full bg-[#2D5B3E] text-white py-4 rounded-lg font-semibold hover:bg-green-900 transition disabled:opacity-50 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    Registrarme como Agricultor
                </button>
            </div>

            <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to={ROUTES.SIGNUP} className="text-[#3E7C59] font-semibold hover:text-green-800">
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </div>
    )
}
