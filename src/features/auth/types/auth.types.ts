export type Role = "farmer" | "cooperative" | null
export type Plan = "basic" | "regular" | "premium" | null

export interface AuthState {
    email: string
    password: string
    role: Role
    plan: Plan
}

export interface PlanOption {
    id: Plan
    name: string
    price: string
    period: string
    color: string
    features: string[]
}
