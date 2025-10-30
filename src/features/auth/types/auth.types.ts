export type Role = "farmer" | "cooperative" | null
export type Plan = "basic" | "regular" | "premium" | null

export interface AuthState {
    email: string
    password: string
    role: Role
    plan: Plan
}

export interface PlanOption {
    id: string
    name: string
    price: string
    period: string
    bgColor: string
    borderColor: string
    textColor: string
    accentColor: string
    hoverBg: string
    features: string[]
}