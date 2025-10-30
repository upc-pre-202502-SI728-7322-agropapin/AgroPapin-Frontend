"use client"

import { useState } from "react"
import {useNavigate} from "react-router-dom";
import type { Role } from "../types/auth.types.ts"
import { ROUTES } from "../../../shared/constants/routes"
import farmer from "../../../assets/granjero.png"
import cooperative from "../../../assets/cooperativa.png"
export function RoleSelector() {
    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState<Role>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSelect = async (role: Role) => {
        if (!role) return

        setIsLoading(true)
        setTimeout(() => {
            navigate(ROUTES.ONBOARDING.PLAN)
        }, 500)
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Select your role</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => {
                        setSelectedRole("farmer")
                        handleSelect("farmer")
                    }}
                    disabled={isLoading}
                    className={`p-8 rounded-2xl transition transform hover:scale-105 ${
                        selectedRole === "farmer"
                            ? "bg-[#F3F1E7] border-2 border-[#F3F1E7]"
                            : "bg-[#F3F1E7] border-2 border-[#F3F1E7] hover:border-[#DAD5BC]"
                    } disabled:opacity-50`}
                >
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-6xl mb-4">
                            <img src={farmer} className="h-30" alt="farmer"/>
                        </div>
                        <h3 className="text-2xl font-bold text-[#3E7C59]">Farmer</h3>
                        <p className="text-gray-600 mt-2">Individual agricultural producer</p>
                    </div>


                </button>

                <button
                    onClick={() => {
                        setSelectedRole("cooperative")
                        handleSelect("cooperative")
                    }}
                    disabled={isLoading}
                    className={`p-8 rounded-2xl transition transform hover:scale-105 ${
                        selectedRole === "cooperative"
                            ? "bg-[#A9B8B3] border-2 border-[#A9B8B3] border-[#A5B3AE]"
                            : "bg-[#A9B8B3] border-2 border-[#A9B8B3] hover:border-[#78827F]"
                    } disabled:opacity-50`}
                >
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-6xl mb-4">
                            <img src={cooperative} className="h-30" alt="cooperative"/>
                        </div>
                        <h3 className="text-white text-2xl font-bold text-teal-700">Cooperative</h3>
                        <p className="text-white mt-2">Agricultural cooperative organization</p>
                    </div>
                </button>
            </div>
        </div>
    )
}
