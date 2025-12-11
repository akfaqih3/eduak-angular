import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./pages/course-list-page/course-list-page.component').then(
        (m) => m.CourseListPageComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-detail-page/course-detail-page.component').then(
        (m) => m.CourseDetailPageComponent
      ),
  },
  
] as Routes;
