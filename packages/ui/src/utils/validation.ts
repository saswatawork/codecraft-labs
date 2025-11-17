/**
 * Form validation utilities
 * Common validation functions for forms
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Email validation
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { isValid: true };
}

/**
 * Password validation
 */
export function validatePassword(
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {},
): ValidationResult {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false,
  } = options;

  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters` };
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (requireNumbers && !/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }

  return { isValid: true };
}

/**
 * URL validation
 */
export function validateUrl(url: string): ValidationResult {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

/**
 * Phone number validation (US format)
 */
export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
  
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }
  
  return { isValid: true };
}

/**
 * Required field validation
 */
export function validateRequired(value: string | number | boolean): ValidationResult {
  if (value === '' || value === null || value === undefined) {
    return { isValid: false, error: 'This field is required' };
  }
  
  return { isValid: true };
}

/**
 * Minimum length validation
 */
export function validateMinLength(value: string, minLength: number): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'This field is required' };
  }
  
  if (value.length < minLength) {
    return { isValid: false, error: `Must be at least ${minLength} characters` };
  }
  
  return { isValid: true };
}

/**
 * Maximum length validation
 */
export function validateMaxLength(value: string, maxLength: number): ValidationResult {
  if (value && value.length > maxLength) {
    return { isValid: false, error: `Must be no more than ${maxLength} characters` };
  }
  
  return { isValid: true };
}

/**
 * Number range validation
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
): ValidationResult {
  if (value < min || value > max) {
    return { isValid: false, error: `Must be between ${min} and ${max}` };
  }
  
  return { isValid: true };
}

/**
 * Pattern matching validation
 */
export function validatePattern(value: string, pattern: RegExp, errorMessage: string): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'This field is required' };
  }
  
  if (!pattern.test(value)) {
    return { isValid: false, error: errorMessage };
  }
  
  return { isValid: true };
}

/**
 * Credit card validation (Luhn algorithm)
 */
export function validateCreditCard(cardNumber: string): ValidationResult {
  const sanitized = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(sanitized)) {
    return { isValid: false, error: 'Card number must contain only digits' };
  }
  
  if (sanitized.length < 13 || sanitized.length > 19) {
    return { isValid: false, error: 'Invalid card number length' };
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(sanitized[i] ?? '0', 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return { isValid: false, error: 'Invalid card number' };
  }
  
  return { isValid: true };
}

/**
 * Date validation
 */
export function validateDate(date: string | Date): ValidationResult {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (Number.isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Invalid date' };
  }
  
  return { isValid: true };
}

/**
 * Future date validation
 */
export function validateFutureDate(date: string | Date): ValidationResult {
  const dateValidation = validateDate(date);
  if (!dateValidation.isValid) {
    return dateValidation;
  }
  
  const dateObj = date instanceof Date ? date : new Date(date);
  if (dateObj <= new Date()) {
    return { isValid: false, error: 'Date must be in the future' };
  }
  
  return { isValid: true };
}

/**
 * Compose multiple validators
 */
export function composeValidators(
  ...validators: ((value: any) => ValidationResult)[]
): (value: any) => ValidationResult {
  return (value: any) => {
    for (const validator of validators) {
      const result = validator(value);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  };
}

/**
 * Username validation
 */
export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { isValid: false, error: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters' };
  }
  
  if (username.length > 20) {
    return { isValid: false, error: 'Username must be no more than 20 characters' };
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, hyphens, and underscores' };
  }
  
  return { isValid: true };
}
