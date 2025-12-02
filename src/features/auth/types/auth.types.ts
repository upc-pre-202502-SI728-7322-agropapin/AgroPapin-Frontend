export type Role = "farmer" | "cooperative" | null;

export interface User {
  id: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login?: () => void;
  logout: () => void;
}

// Onboarding types
export interface PlanOption {
  id: string;
  name: string;
  price: string;
  period: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  hoverBg: string;
  features: string[];
}