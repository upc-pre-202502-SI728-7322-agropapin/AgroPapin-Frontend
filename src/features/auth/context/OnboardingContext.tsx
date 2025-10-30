import { createContext, useContext, useState, type ReactNode } from "react"
import type { PlanOption, Role } from "../types/auth.types"

interface SignUpFormData {
    email: string
    password: string
    firstName: string
    lastName: string
}

interface OnboardingContextType {
    selectedPlan: PlanOption | null
    setSelectedPlan: (plan: PlanOption) => void
    selectedRole: Role
    setSelectedRole: (role: Role) => void
    formData: SignUpFormData
    setFormData: (data: SignUpFormData) => void
    updateFormField: (field: keyof SignUpFormData, value: string) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null)
    const [selectedRole, setSelectedRole] = useState<Role>(null)
    const [formData, setFormData] = useState<SignUpFormData>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    })

    const updateFormField = (field: keyof SignUpFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <OnboardingContext.Provider 
            value={{ 
                selectedPlan, 
                setSelectedPlan,
                selectedRole,
                setSelectedRole,
                formData,
                setFormData,
                updateFormField,
            }}
        >
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