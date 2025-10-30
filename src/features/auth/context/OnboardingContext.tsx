import { createContext, useContext, useState, type ReactNode } from "react"
import type { PlanOption } from "../types/auth.types"

interface OnboardingContextType {
    selectedPlan: PlanOption | null
    setSelectedPlan: (plan: PlanOption) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null)

    return (
        <OnboardingContext.Provider value={{ selectedPlan, setSelectedPlan }}>
            {children}
        </OnboardingContext.Provider>
    )
}

export function useOnboarding() {
    const context = useContext(OnboardingContext)
    if (!context) {
        throw new Error("useOnboarding must be used within OnboardingProvider")
    }
    return context
}