/**
 * API Endpoints Constants
 * Centralized location for all API endpoints
 */

export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  // Account Endpoints
  ACCOUNT: {
    BASE: `${API_BASE_URL}/accounts`,
    REGISTER: `${API_BASE_URL}/accounts/register`,
    PROFILE: `${API_BASE_URL}/accounts/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/accounts/profile`,
  },

  // Auth Endpoints
  AUTH: {
    BASE: `${API_BASE_URL}/auth`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGIN_GOOGLE: `${API_BASE_URL}/auth/google`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    VERIFY_TOKEN: `${API_BASE_URL}/auth/verify-token`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
    SEND_OTP: `${API_BASE_URL}/auth/send-otp`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    CONFIRM_RESET_PASSWORD: `${API_BASE_URL}/auth/confirm-reset-password`,
    VALIDATE_RESET_TOKEN: `${API_BASE_URL}/auth/validate-reset-token`,
  },

  // Course Endpoints
  COURSE: {
    BASE: `${API_BASE_URL}/courses`,
    BY_ID: (id: number) => `${API_BASE_URL}/courses/${id}`,
  },

  // Student Endpoints
  STUDENT: {
    BASE: `${API_BASE_URL}/student`,
    ENROLLED_COURSES: `${API_BASE_URL}/student/courses`,
    ENROLLED_COURSE: (id: number) => `${API_BASE_URL}/student/courses/${id}`,
  },

  // Teacher Endpoints
  TEACHER: {
    BASE: `${API_BASE_URL}/teacher`,
    COURSES: `${API_BASE_URL}/teacher/courses`,
    COURSE: (id: number) => `${API_BASE_URL}/teacher/courses/${id}`,
    CREATE_COURSE: `${API_BASE_URL}/teacher/courses`,
    UPDATE_COURSE: (id: number) => `${API_BASE_URL}/teacher/courses/${id}`,
    DELETE_COURSE: (id: number) => `${API_BASE_URL}/teacher/courses/${id}`,
  },

  // Subject Endpoints
  SUBJECT: {
    BASE: `${API_BASE_URL}/subjects`,
    BY_SLUG: (slug: string) => `${API_BASE_URL}/subjects/${slug}`,
  },
} as const;
