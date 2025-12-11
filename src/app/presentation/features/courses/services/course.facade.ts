import { Injectable, inject } from '@angular/core';

import { BaseFacade } from '../../../shared/services/base-facade';
import { CourseStore } from './course.store';
import { GetCoursesUseCase } from '../../../../domain/usecases/course/get-courses.usecase';
import { GetCourseUseCase } from '../../../../domain/usecases/course/get-course.usecase';
import {
  CourseViewModel,
  toCourseViewModel,
} from '../models/course.view-model';
import { CourseEntity } from '../../../../domain/entities/course.entity';
import { DomainError } from '../../../../core';

/**
 * CourseFacade
 * Provides a simplified interface for course management operations
 *
 * This facade follows the Facade Pattern as described in the design document.
 * It acts as an abstraction layer between presentation components and domain use cases,
 * handling course logic and state management.
 *
 * Key responsibilities:
 * - Execute course use cases (get, create, update, delete)
 * - Transform domain entities to view models
 * - Update CourseStore with course state
 * - Provide reactive signals for components
 *
 * @example
 * ```typescript
 * // In a component
 * class CourseListComponent {
 *   private courseFacade = inject(CourseFacade);
 *
 *   ngOnInit() {
 *     this.courseFacade.loadCourses();
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CourseFacade extends BaseFacade<CourseViewModel[], CourseStore> {
  // Inject use cases
  private readonly getCoursesUseCase = inject(GetCoursesUseCase);
  private readonly getCourseUseCase = inject(GetCourseUseCase);

  constructor() {
    super(inject(CourseStore));
  }

  // Expose course-specific signals from the store
  readonly courses = this.store.courses;
  readonly totalCourses = this.store.totalCourses;
  readonly filteredCourses = this.store.filteredCourses;
  readonly selectedCourse = this.store.selectedCourse;
  readonly selectedCourseId = this.store.selectedCourseId;
  readonly searchQuery = this.store.searchQuery;
  readonly filterSubject = this.store.filterSubject;

  /**
   * Load all courses for the teacher
   *
   * @returns Promise<boolean> - true if courses loaded successfully, false otherwise
   */
  async loadCourses(): Promise<boolean> {
    const success = await this.executeUseCase(
      () => this.getCoursesUseCase.execute(),
      (courses: CourseEntity[]) => {
        // Convert entities to view models

        const courseViewModels = courses.map(toCourseViewModel);
        this.store.setCourses(courseViewModels);
      }
    );

    return success;
  }

  /**
   * Load a single course by ID
   *
   * @param courseId - ID of the course to load
   * @returns Promise<CourseViewModel | null> - Course view model if successful, null otherwise
   */
  async loadCourse(courseId: number): Promise<CourseViewModel | null> {
    let courseViewModel: CourseViewModel | null = null;

    const success = await this.executeUseCase(
      () => this.getCourseUseCase.execute(courseId),
      (course: CourseEntity) => {
        // Convert entity to view model
        courseViewModel = toCourseViewModel(course);

        // Select the course
        this.store.selectCourse(courseId);
      }
    );

    return success ? courseViewModel : null;
  }

  /**
   * Select a course by ID
   *
   * @param courseId - ID of the course to select (null to deselect)
   */
  selectCourse(courseId: number | null): void {
    this.store.selectCourse(courseId);
  }

  /**
   * Set search query for filtering courses
   *
   * @param query - Search query string
   */
  setSearchQuery(query: string): void {
    this.store.setSearchQuery(query);
  }

  /**
   * Set subject filter
   *
   * @param subject - Subject to filter by (null to clear filter)
   */
  setFilterSubject(subject: string | null): void {
    this.store.setFilterSubject(subject);
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.store.clearFilters();
  }

  /**
   * Clear all courses from the store
   */
  clearCourses(): void {
    this.store.clearCourses();
  }

  /**
   * Get a course by ID from the current store state
   *
   * @param courseId - ID of the course
   * @returns CourseViewModel | undefined
   */
  getCourseById(courseId: number): CourseViewModel | undefined {
    const courses = this.store.courses();
    return courses?.find((course) => course.id === courseId);
  }
}
