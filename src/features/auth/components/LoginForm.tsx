"use client"

import type React from "react"
import { useState } from "react"
import {useNavigate} from "react-router-dom";
import { validateEmail, validatePassword } from "../../../shared/utils/validations.ts"
import { ROUTES } from "../../../shared/constants/routes"
import {Link} from "react-router-dom";

export function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: typeof errors = {}

        if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email"
        }
        if (!validatePassword(password)) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            navigate(ROUTES.DASHBOARD)
        }, 500)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors({ ...errors, email: undefined })
                    }}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                        errors.email
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 bg-gray-100 focus:border-green-600 focus:bg-white"
                    } focus:outline-none`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password) setErrors({ ...errors, password: undefined })
                    }}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                        errors.password
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 bg-gray-100 focus:border-green-600 focus:bg-white"
                    } focus:outline-none`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-blue-500 hover:text-blue-600">
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3E7C59] text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
            >
                {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link to={ROUTES.SIGNUP} className="text-[#3E7C59] font-semibold hover:text-green-800">
                    Sign up
                </Link>
            </p>
        </form>
    )
}
