import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../shared/services/notification.service';

/**
 * ErrorInterceptor
 * Centralized error handling for all HTTP requests
 * 
 * This interceptor implements requirement 9.1 from the design document:
 * - Catches all HTTP errors from API calls
 * - Displays user-friendly error messages
 * - Handles different error status codes appropriately
 * 
 * Error handling strategy:
 * - 400: Bad Request - Show validation errors
 * - 401: Unauthorized - Handled by AuthInterceptor
 * - 403: Forbidden - Show access denied message
 * - 404: Not Found - Show resource not found message
 * - 500: Server Error - Show generic server error message
 * - Network errors - Show connection error message
 * 
 * @example
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([errorInterceptor])
 *     )
 *   ]
 * };
 */
export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'حدث خطأ غير متوقع';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = 'خطأ في الاتصال بالشبكة. يرجى التحقق من اتصالك بالإنترنت.';
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            // Bad Request - validation errors
            errorMessage = error.error?.message || 'البيانات المدخلة غير صحيحة';
            if (error.error?.errors) {
              // Handle validation errors array
              const validationErrors = Object.values(error.error.errors).flat();
              errorMessage = validationErrors.join(', ') || errorMessage;
            }
            break;

          case 401:
            // Unauthorized - handled by AuthInterceptor
            // Don't show notification here to avoid duplicate messages
            return throwError(() => error);

          case 403:
            // Forbidden
            errorMessage = 'ليس لديك صلاحية للوصول إلى هذا المورد';
            break;

          case 404:
            // Not Found
            errorMessage = 'المورد المطلوب غير موجود';
            break;

          case 409:
            // Conflict
            errorMessage = error.error?.message || 'حدث تعارض في البيانات';
            break;

          case 422:
            // Unprocessable Entity
            errorMessage = error.error?.message || 'لا يمكن معالجة البيانات المدخلة';
            break;

          case 500:
            // Internal Server Error
            errorMessage = 'خطأ في الخادم. يرجى المحاولة لاحقاً';
            break;

          case 503:
            // Service Unavailable
            errorMessage = 'الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً';
            break;

          default:
            // Generic error message
            errorMessage = error.error?.message || `حدث خطأ: ${error.status}`;
        }
      }

      // Display error notification to user
      notificationService.error(errorMessage, 7000);

      // Re-throw the error for further handling by components if needed
      return throwError(() => error);
    })
  );
};
