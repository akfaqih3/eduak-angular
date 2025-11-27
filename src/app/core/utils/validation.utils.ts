import { VALIDATION } from '../constants';

/**
 * Validation Utilities
 * Helper functions for data validation
 */

export class ValidationUtils {
  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  static isValidPassword(password: string): boolean {
    return (
      password.length >= VALIDATION.MIN_PASSWORD_LENGTH &&
      password.length <= VALIDATION.MAX_PASSWORD_LENGTH
    );
  }

  /**
   * Check if password is strong
   * Must contain: uppercase, lowercase, number, special character
   */
  static isStrongPassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      this.isValidPassword(password) &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  }

  /**
   * Validate username
   */
  static isValidUsername(username: string): boolean {
    return (
      username.length >= VALIDATION.MIN_USERNAME_LENGTH &&
      username.length <= VALIDATION.MAX_USERNAME_LENGTH
    );
  }

  /**
   * Validate OTP code
   */
  static isValidOTP(otp: string): boolean {
    return otp.length === VALIDATION.OTP_LENGTH && /^\d+$/.test(otp);
  }

  /**
   * Check if passwords match
   */
  static doPasswordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  /**
   * Validate required field
   */
  static isRequired(value: any): boolean {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  }

  /**
   * Validate file size
   */
  static isValidFileSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
  }

  /**
   * Validate file type
   */
  static isValidFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }

  /**
   * Get password strength level
   */
  static getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
    if (this.isStrongPassword(password)) {
      return 'strong';
    }
    if (this.isValidPassword(password)) {
      return 'medium';
    }
    return 'weak';
  }
}
