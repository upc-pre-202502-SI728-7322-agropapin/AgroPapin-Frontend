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

export function isRequired(value: string | number): boolean {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return value !== null && value !== undefined && !isNaN(value);
  return false;
}

export function isPositiveNumber(value: string | number): boolean {
  const num = typeof value === 'string' ? Number(value) : value;
  return !isNaN(num) && num >= 0;
}

export function isNumber(value: string | number): boolean {
  if (typeof value === 'number') return !isNaN(value);
  return /^\d+(\.\d+)?$/.test(value.trim());
}

export function maxValue(value: string | number, max: number): boolean {
  const num = typeof value === 'string' ? Number(value) : value;
  return !isNaN(num) && num <= max;
}

export function validateField({ value, required, positive, numeric, max }:{
  value: string | number,
  required?: boolean,
  positive?: boolean,
  numeric?: boolean,
  max?: number
}): string | null {
  if (required && !isRequired(value)) return 'This field is required.';
  if (numeric && !isNumber(value)) return 'Only numbers are allowed.';
  if (positive && !isPositiveNumber(value)) return 'Value must be positive.';
  if (typeof max === 'number' && !maxValue(value, max)) return `Maximum allowed value is ${max}.`;
  return null;
}

