"use client"

import { useState } from "react"
import type { Role } from "../types/auth.types"
import { ROUTES } from "../../../shared/constants/routes"
import {useNavigate} from "react-router-dom";
import {RoleCard} from "../../../shared/components/ui/RoleCard.tsx";

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
        <div className="space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">Select your role</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RoleCard
                    role="farmer"
                    isSelected={selectedRole === "farmer"}
                    isLoading={isLoading}
                    onClick={() => {
                        setSelectedRole("farmer")
                        handleSelect("farmer")
                    }}
                />

                <RoleCard
                    role="cooperative"
                    isSelected={selectedRole === "cooperative"}
                    isLoading={isLoading}
                    onClick={() => {
                        setSelectedRole("cooperative")
                        handleSelect("cooperative")
                    }}
                />
            </div>
        </div>
    )
}
