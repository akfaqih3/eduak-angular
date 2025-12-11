import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CourseFacade } from '../../services/course.facade';
import { CourseListComponent } from '../../components/course-list/course-list.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/feedback/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../../shared/components/feedback/error-message/error-message.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';

/**
 * CourseListPageComponent (Smart Component)
 *
 * This is a container/smart component that handles the business logic
 * for the course list page. It interacts with CourseFacade to load
 * and manage courses.
 *
 * Responsibilities:
 * - Load courses on initialization
 * - Handle course selection
 * - Handle course deletion
 * - Manage search and filter state
 * - Navigate to course details/edit pages
 * - Display presentational CourseListComponent
 */
@Component({
  selector: 'app-course-list-page',
  standalone: true,
  imports: [
    CourseListComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    ButtonComponent,
    InputComponent,
    FormsModule,
  ],
  templateUrl: './course-list-page.component.html',
  styleUrl: './course-list-page.component.scss',
})
export class CourseListPageComponent implements OnInit {
  private readonly courseFacade = inject(CourseFacade);
  private readonly router = inject(Router);

  // Expose facade signals
  readonly courses = this.courseFacade.filteredCourses;
  readonly loading = this.courseFacade.loading;
  readonly error = this.courseFacade.error;
  readonly totalCourses = this.courseFacade.totalCourses;
  readonly filterSubject = this.courseFacade.filterSubject;

  // Local search state
  searchQuery = signal<string>('');

  @ViewChild(InputComponent) searchInput!: InputComponent;

   ngOnInit(): void {
    this.loadCourses();
  }

  /**
   * Load all courses
   */
  async loadCourses(): Promise<void> {
    await this.courseFacade.loadCourses();
  }

  /**
   * Handle course selection
   * Navigate to course details page
   *
   * @param courseId - ID of the selected course
   */
  onCourseSelected(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  /**
   * Handle search query change
   *
   * @param query - Search query string
   */
  onSearchChange(event: Event): void {
    let query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);
    this.courseFacade.setSearchQuery(query);

  }

  /**
   * Handle subject filter change
   *
   * @param subject - Subject to filter by
   */
  onFilterSubject(subject: string | null): void {
    this.courseFacade.setFilterSubject(subject);
  }

  /**
   * Clear all filters
   */
  onClearFilters(): void {
    this.searchQuery.set('');
    this.courseFacade.clearFilters();
    this.searchInput.value = '';
  }

  /**
   * Navigate to create new course page
   */
  onCreateCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  /**
   * Retry loading courses on error
   */
  onRetry(): void {
    this.loadCourses();
  }
}
