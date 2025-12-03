import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthFacade } from '../features/auth/services/auth.facade';

/**
 * AuthGuard
 * Protects routes that require authentication
 * 
 * This guard checks if the user is authenticated before allowing access to a route.
 * If the user is not authenticated, they are redirected to the login page.
 * 
 * Usage in routes:
 * ```typescript
 * {
 *   path: 'dashboard',
 *   component: DashboardComponent,
 *   canActivate: [authGuard]
 * }
 * ```
 * 
 * @param route - The activated route snapshot
 * @param state - The router state snapshot
 * @returns boolean - true if user is authenticated, false otherwise
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  // Check if user is authenticated
  const isAuthenticated = authFacade.isAuthenticated();

  if (!isAuthenticated) {
    // Store the attempted URL for redirecting after login
    const returnUrl = state.url;
    
    // Redirect to login page with return URL as query parameter
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl }
    });
    
    return false;
  }

  return true;
};
