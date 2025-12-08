export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface TokenVerificationResponse {
  valid: boolean;
}

export interface OTPVerificationResponse {
  valid: boolean;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}
