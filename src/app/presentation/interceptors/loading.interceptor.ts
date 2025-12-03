import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../shared/services/loading.service';

/**
 * LoadingInterceptor
 * Automatically manages global loading state for HTTP requests
 * 
 * This interceptor implements requirement 9.2 from the design document:
 * - Shows loading indicator when HTTP requests start
 * - Hides loading indicator when requests complete (success or error)
 * - Handles multiple simultaneous requests correctly
 * 
 * The interceptor uses LoadingService to track active requests.
 * The loading indicator will remain visible as long as any request is active.
 * 
 * @example
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([loadingInterceptor])
 *     )
 *   ]
 * };
 * 
 * // In app.component.ts
 * class AppComponent {
 *   private loadingService = inject(LoadingService);
 *   isLoading = this.loadingService.isLoading;
 * }
 * 
 * // In app.component.html
 * @if (isLoading()) {
 *   <app-loading-spinner />
 * }
 */
export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService);

  // Check if request should skip loading indicator
  // Useful for background requests that shouldn't show loading
  const skipLoading = req.headers.has('X-Skip-Loading');

  if (!skipLoading) {
    // Increment active request counter
    loadingService.show();
  }

  // Pass the request to the next handler and ensure loading is hidden when complete
  return next(req).pipe(
    finalize(() => {
      if (!skipLoading) {
        // Decrement active request counter
        loadingService.hide();
      }
    })
  );
};
