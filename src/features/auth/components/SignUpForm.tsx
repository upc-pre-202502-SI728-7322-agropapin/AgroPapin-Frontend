"use client"

import type React from "react"
import { useState } from "react"
import {useNavigate} from "react-router-dom";
import { validateEmail, validatePassword } from "../../../shared/utils/validations.ts"
import { ROUTES } from "../../../shared/constants/routes"
import {Link} from "react-router-dom";

export function SignupForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({})
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
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            navigate(ROUTES.ONBOARDING.ROLE)
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

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined })
                    }}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                        errors.confirmPassword
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 bg-gray-100 focus:border-green-600 focus:bg-white"
                    } focus:outline-none`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
            >
                {isLoading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link to={ROUTES.LOGIN} className="text-green-700 font-semibold hover:text-green-800">
                    Sign in
                </Link>
            </p>
        </form>
    )
}
