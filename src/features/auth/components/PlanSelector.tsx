"use client"

import { useState } from "react"
import {useNavigate} from "react-router-dom";
import type { Plan, PlanOption } from "../types/auth.types"
import { ROUTES } from "../../../shared/constants/routes"

const plans: PlanOption[] = [
    {
        id: "basic",
        name: "Basic",
        price: "$2.99",
        period: "/mes",
        color: "bg-[#F3F1E7] border-[#F3F1E7]",
        features: ["Register up to 5 crops", "Basic real-time irrigation monitoring"],
    },
    {
        id: "regular",
        name: "Regular",
        price: "$7.99",
        period: "/month",
        color: "bg-teal-100 border-teal-300",
        features: ["Basic plan benefits but with 15 crops", "Statistical graphs on agricultural production"],
    },
    {
        id: "premium",
        name: "Premium",
        price: "$14.99",
        period: "/month",
        color: "bg-amber-100 border-amber-300",
        features: ["Regular benefits but with unlimited crops", "Customization of alerts according to user needs"],
    },
]

export function PlanSelector() {
    const navigate = useNavigate()
    const [selectedPlan, setSelectedPlan] = useState<Plan>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSelect = async (plan: Plan) => {
        if (!plan) return

        setIsLoading(true)
        setTimeout(() => {
            navigate(ROUTES.ONBOARDING.PAYMENT)
        }, 500)
    }

    return (
        <div className="space-y-8 border-blue-700 border-2 h-full">
            <h2 className="text-3xl font-bold text-gray-900">Select a plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-red-400 border-2 h-4/5">
                {plans.map((plan) => (
                    <button
                        key={plan.id}
                        onClick={() => {
                            setSelectedPlan(plan.id)
                            handleSelect(plan.id)
                        }}
                        disabled={isLoading}
                        className={`p-6 rounded-2xl border-2 transition transform hover:scale-105 text-left ${plan.color} disabled:opacity-50`}
                    >
                        <h3 className="text-2xl font-bold text-green-700 mb-2">{plan.name}</h3>
                        <div className="mb-4">
                            <span className="text-3xl font-bold text-green-700">{plan.price}</span>
                            <span className="text-gray-600 ml-1">{plan.period}</span>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-700">
                                    <span className="text-green-600 font-bold mt-1">✓</span>
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
                        >
                            Select
                        </button>
                    </button>
                ))}
            </div>
        </div>
    )
}
