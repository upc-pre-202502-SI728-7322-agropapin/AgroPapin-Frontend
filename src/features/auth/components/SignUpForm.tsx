"use client"

import type React from "react"
import { useState } from "react"
import {useNavigate} from "react-router-dom";
import { validateEmail, validatePassword } from "../../../shared/utils/validations.ts"
import { ROUTES } from "../../../shared/constants/routes"
import {Link} from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext"

export function SignupForm() {
    const navigate = useNavigate()
    const { formData, updateFormField } = useOnboarding()
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState<{ 
        email?: string
        password?: string
        confirmPassword?: string
        firstName?: string
        lastName?: string
    }>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: typeof errors = {}

       
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = "Password must be at least 6 characters"
        }
        if (formData.password !== confirmPassword) {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => {
                            updateFormField("firstName", e.target.value)
                            if (errors.firstName) setErrors({ ...errors, firstName: undefined })
                        }}
                        placeholder="Enter your first name"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                            errors.firstName
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300 bg-gray-100 focus:border-green-600 focus:bg-white"
                        } focus:outline-none`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => {
                            updateFormField("lastName", e.target.value)
                            if (errors.lastName) setErrors({ ...errors, lastName: undefined })
                        }}
                        placeholder="Enter your last name"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                            errors.lastName
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300 bg-gray-100 focus:border-green-600 focus:bg-white"
                        } focus:outline-none`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                        updateFormField("email", e.target.value)
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
                    value={formData.password}
                    onChange={(e) => {
                        updateFormField("password", e.target.value)
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
                className="w-full bg-[#3E7C59] text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
            >
                {isLoading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link to={ROUTES.LOGIN} className="text-[#3E7C59] font-semibold hover:text-green-800">
                    Sign in
                </Link>
            </p>
        </form>
    )
}
