/**
 * API Endpoints Constants
 * Centralized location for all API endpoint paths
 */

// Base Resource Paths
export const API_RESOURCES = {
  ACCOUNTS: 'accounts',
  COURSES: 'courses',
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  SUBJECTS: 'subjects',
} as const;

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: 'login',
  GOOGLE_LOGIN: 'google/login',
  LOGOUT: 'logout',
  TOKEN_VERIFY: 'token/verify',
  TOKEN_REFRESH: 'token/refresh',
  CHANGE_PASSWORD: 'change-password',
  PASSWORD_RESET: 'password-reset',
  PASSWORD_RESET_CONFIRM: 'password-reset/confirm',
  PASSWORD_RESET_VALIDATE_TOKEN: 'password-reset/validate_token',
  OTP_SEND: 'otp-send',
  OTP_VERIFY: 'otp-verify',
} as const;

// Account Endpoints
export const ACCOUNT_ENDPOINTS = {
  REGISTER: 'register',
  PROFILE: 'profile',
  UPDATE: 'update',
} as const;

// Student Endpoints
export const STUDENT_ENDPOINTS = {
  ENROLLED_COURSES: `${API_RESOURCES.COURSES}/enrolled`,
  ENROLL: (id: number) => `${API_RESOURCES.COURSES}/${id}/enroll`,
} as const;

// Teacher Endpoints
export const TEACHER_ENDPOINTS = {
  COURSES: `${API_RESOURCES.COURSES}`,
  COURSE_DETAIL: (id: number) => `${API_RESOURCES.COURSES}/${id}`,
  CREATE_COURSE: `${API_RESOURCES.COURSES}/create`,
  UPDATE_COURSE: (id: number) => `${API_RESOURCES.COURSES}/${id}/update`,
  DELETE_COURSE: (id: number) => `${API_RESOURCES.COURSES}/${id}/delete`,
} as const;

