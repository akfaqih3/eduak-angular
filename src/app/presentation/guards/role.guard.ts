import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthFacade } from '../features/auth/services/auth.facade';
import { RoleEnum } from '../../domain/entities/account.entity';

/**
 * RoleGuard
 * Protects routes based on user roles
 * 
 * This guard checks if the authenticated user has the required role(s) to access a route.
 * If the user doesn't have the required role, they are redirected to an unauthorized page.
 * 
 * Usage in routes:
 * ```typescript
 * // Single role
 * {
 *   path: 'admin',
 *   component: AdminComponent,
 *   canActivate: [authGuard, roleGuard],
 *   data: { roles: [RoleEnum.Teacher] }
 * }
 * 
 * // Multiple roles (user must have at least one)
 * {
 *   path: 'dashboard',
 *   component: DashboardComponent,
 *   canActivate: [authGuard, roleGuard],
 *   data: { roles: [RoleEnum.Teacher, RoleEnum.Student] }
 * }
 * ```
 * 
 * @param route - The activated route snapshot containing role data
 * @param state - The router state snapshot
 * @returns boolean - true if user has required role, false otherwise
 */
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  // Get required roles from route data
  const requiredRoles = route.data['roles'] as RoleEnum[] | undefined;

  // If no roles are specified, allow access
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // Check if user is authenticated first
  const isAuthenticated = authFacade.isAuthenticated();
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  // Get user's current role
  const userRole = authFacade.userRole();

  // Check if user has any of the required roles
  const hasRequiredRole = requiredRoles.includes(userRole);

  if (!hasRequiredRole) {
    // Redirect to unauthorized page or home
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};

/**
 * Helper function to create a role guard for a specific role
 * 
 * @param role - The required role
 * @returns CanActivateFn - A guard function that checks for the specific role
 * 
 * @example
 * ```typescript
 * {
 *   path: 'teacher-dashboard',
 *   component: TeacherDashboardComponent,
 *   canActivate: [authGuard, requireRole(RoleEnum.Teacher)]
 * }
 * ```
 */
export const requireRole = (role: RoleEnum): CanActivateFn => {
  return (route, state) => {
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    const isAuthenticated = authFacade.isAuthenticated();
    if (!isAuthenticated) {
      router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    const userRole = authFacade.userRole();
    if (userRole !== role) {
      router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  };
};

/**
 * Helper function to create a guard that requires multiple roles (user must have all)
 * 
 * @param roles - Array of required roles (user must have all)
 * @returns CanActivateFn - A guard function that checks for all roles
 * 
 * @example
 * ```typescript
 * {
 *   path: 'admin-panel',
 *   component: AdminPanelComponent,
 *   canActivate: [authGuard, requireAllRoles([RoleEnum.Teacher])]
 * }
 * ```
 */
export const requireAllRoles = (roles: RoleEnum[]): CanActivateFn => {
  return (route, state) => {
    const authFacade = inject(AuthFacade);
    const router = inject(Router);

    const isAuthenticated = authFacade.isAuthenticated();
    if (!isAuthenticated) {
      router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    const userRole = authFacade.userRole();
    const hasAllRoles = roles.includes(userRole);

    if (!hasAllRoles) {
      router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  };
};
