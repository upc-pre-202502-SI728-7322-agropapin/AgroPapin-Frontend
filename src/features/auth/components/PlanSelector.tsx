"use client"

import { useState } from "react"
import {useNavigate} from "react-router-dom";
import type { PlanOption } from "../types/auth.types"
import { ROUTES } from "../../../shared/constants/routes"
import {PlanCard} from "../../../shared/components/ui/PlanCard.tsx";
import {useOnboarding} from "../context/OnboardingContext.tsx";

const plans: PlanOption[] = [
    {
        id: "basic",
        name: "Basic",
        price: "$2.99",
        period: "/month",
        bgColor: "#F3F1E7",
        borderColor: "#F3F1E7",
        textColor: "#2d7a5f",
        accentColor: "#2d7a5f",
        hoverBg: "#E8E4D0",
        features: ["Register up to 5 crops", "Basic real-time irrigation monitoring"],
    },
    {
        id: "regular",
        name: "Regular",
        price: "$7.99",
        period: "/month",
        bgColor: "#A9B8B3",
        borderColor: "#A9B8B3",
        textColor: "#FFFFFF",
        accentColor: "#FFFFFF",
        hoverBg: "#7A9389",
        features: ["Basic plan benefits but with 15 crops", "Statistical graphs on agricultural production"],
    },
    {
        id: "premium",
        name: "Premium",
        price: "$14.99",
        period: "/month",
        bgColor: "#C9A961",
        borderColor: "#C9A961",
        textColor: "#FFFFFF",
        accentColor: "#FFFFFF",
        hoverBg: "#B89850",
        features: ["Regular benefits but with unlimited crops", "Customization of alerts according to user needs"],
    },
]

export function PlanSelector() {
    const navigate = useNavigate()
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    const {setSelectedPlan: setOnboardingSelectedPlan} = useOnboarding();

    const handleSelect = async (planId: string) => {
        const plan = plans.find(p=> p.id === planId)

        if (plan){
            setSelectedPlan(plan.id)
            setOnboardingSelectedPlan(plan)
            setIsLoading(true)
            setTimeout(() => {
                navigate(ROUTES.ONBOARDING.PAYMENT)
            }, 500)
        }

    }

    return (
        <div className="space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">Select a plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        id={plan.id}
                        name={plan.name}
                        price={plan.price}
                        period={plan.period}
                        bgColor={plan.bgColor}
                        borderColor={plan.borderColor}
                        textColor={plan.textColor}
                        accentColor={plan.accentColor}
                        hoverBg={plan.hoverBg}
                        features={plan.features}
                        isSelected={selectedPlan === plan.id}
                        isLoading={isLoading}
                        onClick={() => {
                            setSelectedPlan(plan.id)
                            handleSelect(plan.id)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
