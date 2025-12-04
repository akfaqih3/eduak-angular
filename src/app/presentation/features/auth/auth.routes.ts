import { Routes } from '@angular/router';

/**
 * Auth Feature Routes
 * Defines all routes for authentication-related pages
 */
export default [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'تسجيل الدخول'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    title: 'إنشاء حساب جديد'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
] as Routes;
