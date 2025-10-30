"use client"

import type React from "react"
import { useState } from "react"
import { validateCardNumber, validateCVC } from "../../../shared/utils/validations.ts"
import { useOnboarding } from "../context/OnboardingContext"
import { useSignUp } from "../hooks/useSignUp"

export function PaymentForm() {
    const { formData, selectedRole } = useOnboarding()
    const { handleSignUp, isLoading, error } = useSignUp()
    const [cardNumber, setCardNumber] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [cvc, setCvc] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}

        // validar los datos de la tarjeta
        if (!validateCardNumber(cardNumber)) {
            newErrors.cardNumber = "Invalid card number"
        }
        if (!dueDate || dueDate.length !== 5) {
            newErrors.dueDate = "Invalid due date (MM/YY)"
        }
        if (!validateCVC(cvc)) {
            newErrors.cvc = "Invalid CVC"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // validar datos de registro
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !selectedRole) {
            alert("Missing registration data. Please go back and complete all steps.")
            return
        }

        // registrar usuario
        await handleSignUp(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName,
            selectedRole
        )
    }

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, "")
        if (/^\d*$/.test(value) && value.length <= 16) {
            setCardNumber(value)
            if (errors.cardNumber) setErrors({ ...errors, cardNumber: "" })
        }
    }

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2, 4)
        }
        if (value.length <= 5) {
            setDueDate(value)
            if (errors.dueDate) setErrors({ ...errors, dueDate: "" })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card number:</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                        errors.cardNumber ? "border-red-500 bg-red-50" : "border-gray-300 bg-white focus:border-green-600"
                    } focus:outline-none`}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due date:</label>
                    <input
                        type="text"
                        value={dueDate}
                        onChange={handleDueDateChange}
                        placeholder="MM / AA"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                            errors.dueDate ? "border-red-500 bg-red-50" : "border-gray-300 bg-white focus:border-green-600"
                        } focus:outline-none`}
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security code:</label>
                    <input
                        type="text"
                        value={cvc}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            if (value.length <= 3) {
                                setCvc(value)
                                if (errors.cvc) setErrors({ ...errors, cvc: "" })
                            }
                        }}
                        placeholder="CVC"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                            errors.cvc ? "border-red-500 bg-red-50" : "border-gray-300 bg-white focus:border-green-600"
                        } focus:outline-none`}
                    />
                    {errors.cvc && <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>}
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold mb-2">Registration Summary:</h4>
                <p className="text-sm text-gray-600">Name: {formData.firstName} {formData.lastName}</p>
                <p className="text-sm text-gray-600">Email: {formData.email}</p>
                <p className="text-sm text-gray-600">Role: {selectedRole}</p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3E7C59] text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
            >
                {isLoading ? "Processing..." : "Complete Registration"}
            </button>
        </form>
    )
}
