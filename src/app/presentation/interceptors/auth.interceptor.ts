import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from '../features/auth/services/auth.store';
import { Router } from '@angular/router';

/**
 * AuthInterceptor
 * Automatically adds authentication token to all HTTP requests
 * and handles token expiration scenarios
 * 
 * This interceptor implements requirement 4.2 from the design document:
 * - Adds JWT token to Authorization header for all outgoing requests
 * - Handles 401 Unauthorized responses (token expired/invalid)
 * - Redirects to login page when authentication fails
 * 
 * @example
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([authInterceptor])
 *     )
 *   ]
 * };
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // Get the authentication token from the store
  const token = authStore.token();

  // Clone the request and add the Authorization header if token exists
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Pass the cloned request to the next handler
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.status === 401) {
        // Clear authentication state
        authStore.clearUser();
        
        // Redirect to login page
        router.navigate(['/auth/login'], {
          queryParams: { returnUrl: router.url }
        });
      }

      // Re-throw the error for further handling
      return throwError(() => error);
    })
  );
};
