import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API_CONFIG } from '../api-config.provider';
import { ApiError, ApiErrorResponse } from '../models';

/**
 * Error Interceptor
 * Centralized error handling for HTTP requests
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const config = inject(API_CONFIG);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let apiError: ApiError;

            if (error.error instanceof ErrorEvent) {
                // Client-side or network error
                apiError = new ApiError(
                    0,
                    'A network error occurred. Please check your connection.',
                    undefined,
                    req.url
                );
            } else {
                // Server-side error
                const errorResponse = error.error as ApiErrorResponse;

                apiError = new ApiError(
                    error.status,
                    errorResponse?.message || getDefaultErrorMessage(error.status),
                    errorResponse?.errors,
                    req.url
                );
            }

            // Log error if logging is enabled
            if (config.enableLogging) {
                console.error('API Error:', {
                    statusCode: apiError.statusCode,
                    message: apiError.message,
                    path: apiError.path,
                    errors: apiError.errors,
                });
            }

            return throwError(() => apiError);
        })
    );
};

/**
 * Get default error message based on status code
 */
function getDefaultErrorMessage(statusCode: number): string {
    switch (statusCode) {
        case 400:
            return 'Bad request. Please check your input.';
        case 401:
            return 'Authentication required. Please log in.';
        case 403:
            return 'You do not have permission to access this resource.';
        case 404:
            return 'The requested resource was not found.';
        case 409:
            return 'A conflict occurred. The resource may already exist.';
        case 422:
            return 'Validation failed. Please check your input.';
        case 429:
            return 'Too many requests. Please try again later.';
        case 500:
            return 'An internal server error occurred.';
        case 502:
            return 'Bad gateway. The server is unavailable.';
        case 503:
            return 'Service temporarily unavailable.';
        case 504:
            return 'Gateway timeout. The request took too long.';
        default:
            return 'An unexpected error occurred.';
    }
}
