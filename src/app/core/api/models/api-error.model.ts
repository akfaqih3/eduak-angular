/**
 * HTTP Error Status Codes
 */
export enum HttpErrorCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
    /**
     * Error status code
     */
    statusCode: number;

    /**
     * Error message
     */
    message: string;

    /**
     * Detailed error description
     */
    error?: string;

    /**
     * Validation errors (if applicable)
     */
    errors?: ValidationError[];

    /**
     * Error timestamp
     */
    timestamp?: string;

    /**
     * Request path
     */
    path?: string;
}

/**
 * Validation Error
 */
export interface ValidationError {
    /**
     * Field name
     */
    field: string;

    /**
     * Error message
     */
    message: string;

    /**
     * Validation rule that failed
     */
    rule?: string;

    /**
     * Rejected value
     */
    value?: any;
}

/**
 * Network Error
 */
export interface NetworkError {
    /**
     * Error type
     */
    type: 'network' | 'timeout' | 'unknown';

    /**
     * Error message
     */
    message: string;

    /**
     * Original error
     */
    originalError?: any;
}

/**
 * Custom API Error Class
 */
export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public override message: string,
        public errors?: ValidationError[],
        public path?: string
    ) {
        super(message);
        this.name = 'ApiError';
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    /**
     * Check if error is a validation error
     */
    isValidationError(): boolean {
        return this.statusCode === HttpErrorCode.UNPROCESSABLE_ENTITY && !!this.errors?.length;
    }

    /**
     * Check if error is an authentication error
     */
    isAuthError(): boolean {
        return this.statusCode === HttpErrorCode.UNAUTHORIZED;
    }

    /**
     * Check if error is a forbidden error
     */
    isForbiddenError(): boolean {
        return this.statusCode === HttpErrorCode.FORBIDDEN;
    }

    /**
     * Check if error is a not found error
     */
    isNotFoundError(): boolean {
        return this.statusCode === HttpErrorCode.NOT_FOUND;
    }

    /**
     * Check if error is a server error
     */
    isServerError(): boolean {
        return this.statusCode >= 500;
    }
}
