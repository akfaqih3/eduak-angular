import { Routes } from '@angular/router';
import { MainLayoutComponent } from './presentation/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './presentation/layouts/auth-layout/auth-layout.component';
import { NotFoundComponent } from './presentation/shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './presentation/shared/components/unauthorized/unauthorized.component';
import { authGuard } from './presentation/guards/auth.guard';
import { roleGuard } from './presentation/guards/role.guard';

/**
 * Application Routes Configuration
 * 
 * This file defines the main routing structure of the application.
 * Routes are organized by layout and use lazy loading for features.
 * 
 * Structure:
 * - Main Layout: Protected routes for authenticated users
 * - Auth Layout: Public routes for authentication
 * - Error Pages: 404 and 403 pages
 * 
 * Guards Usage:
 * - authGuard: Protects routes that require authentication
 *   Example: canActivate: [authGuard]
 * 
 * - roleGuard: Protects routes based on user roles
 *   Example: canActivate: [authGuard, roleGuard], data: { roles: ['teacher'] }
 *   Note: authGuard should always be used before roleGuard
 * 
 * Lazy Loading:
 * All feature modules are lazy loaded to improve initial load time.
 * Use loadChildren for feature routes and loadComponent for standalone components.
 */
export const routes: Routes = [
  // Main application routes with MainLayout
 
  // Authentication routes with AuthLayout
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./presentation/features/auth/auth.routes'),
    title: 'المصادقة'
  },

  // Error pages (standalone, no layout)
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'غير مصرح'
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'الصفحة غير موجودة'
  },

  // Wildcard route for 404
  {
    path: '**',
    component: NotFoundComponent,
    title: 'الصفحة غير موجودة'
  }
];
