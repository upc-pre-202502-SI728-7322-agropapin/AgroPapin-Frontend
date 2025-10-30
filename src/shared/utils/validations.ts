export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
    return password.length >= 6
}

export function validateCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, "")
    return /^\d{16}$/.test(cleaned)
}

export function validateCVC(cvc: string): boolean {
    return /^\d{3}$/.test(cvc)
}

export function validateDueDate(dueDate: string): boolean {
    return /^\d{2}\/\d{2}$/.test(dueDate)
}
