/**
 * Application Constants
 * Centralized location for all application constants
 */

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  LANGUAGE: 'language',
  THEME: 'theme',
} as const;

// HTTP Headers
export const HTTP_HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  ACCEPT_LANGUAGE: 'Accept-Language',
} as const;

// Token Configuration
export const TOKEN_CONFIG = {
  BEARER_PREFIX: 'Bearer ',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes in milliseconds
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

// Validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  OTP_LENGTH: 6,
  OTP_EXPIRY_MINUTES: 5,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'dd/MM/yyyy HH:mm',
  TIME: 'HH:mm',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Request Timeout
export const TIMEOUT = {
  DEFAULT: 30000, // 30 seconds
  UPLOAD: 120000, // 2 minutes
  DOWNLOAD: 60000, // 1 minute
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  PROFILE: '/profile',
  COURSES: '/courses',
  COURSE_DETAIL: (id: number) => `/courses/${id}`,
  DASHBOARD: '/dashboard',
  STUDENT_COURSES: '/student/courses',
  TEACHER_COURSES: '/teacher/courses',
} as const;

// Error Messages (Arabic)
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'فشل الاتصال بالخادم',
  UNAUTHORIZED: 'غير مصرح لك بالوصول',
  FORBIDDEN: 'ليس لديك صلاحية للقيام بهذا الإجراء',
  NOT_FOUND: 'المورد المطلوب غير موجود',
  VALIDATION_ERROR: 'خطأ في التحقق من البيانات',
  SERVER_ERROR: 'حدث خطأ في الخادم',
  UNKNOWN_ERROR: 'حدث خطأ غير متوقع',
  INVALID_CREDENTIALS: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
  TOKEN_EXPIRED: 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى',
  WEAK_PASSWORD: 'كلمة المرور ضعيفة جداً',
  PASSWORD_MISMATCH: 'كلمات المرور غير متطابقة',
  REQUIRED_FIELD: 'هذا الحقل مطلوب',
  INVALID_EMAIL: 'البريد الإلكتروني غير صحيح',
  INVALID_OTP: 'رمز التحقق غير صحيح',
  OTP_EXPIRED: 'انتهت صلاحية رمز التحقق',
} as const;

// Success Messages (Arabic)
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'تم تسجيل الدخول بنجاح',
  LOGOUT_SUCCESS: 'تم تسجيل الخروج بنجاح',
  REGISTER_SUCCESS: 'تم التسجيل بنجاح',
  PROFILE_UPDATED: 'تم تحديث الملف الشخصي بنجاح',
  PASSWORD_CHANGED: 'تم تغيير كلمة المرور بنجاح',
  PASSWORD_RESET_SENT: 'تم إرسال رابط إعادة تعيين كلمة المرور',
  PASSWORD_RESET_SUCCESS: 'تم إعادة تعيين كلمة المرور بنجاح',
  OTP_SENT: 'تم إرسال رمز التحقق',
  OTP_VERIFIED: 'تم التحقق من الرمز بنجاح',
  COURSE_CREATED: 'تم إنشاء الدورة بنجاح',
  COURSE_UPDATED: 'تم تحديث الدورة بنجاح',
  COURSE_DELETED: 'تم حذف الدورة بنجاح',
} as const;

// Languages
export const LANGUAGES = {
  ARABIC: 'ar',
  ENGLISH: 'en',
} as const;

// Themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const;

// Course Status
export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
} as const;
