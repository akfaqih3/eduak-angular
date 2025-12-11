import { Injectable, signal, computed } from '@angular/core';

import { BaseStore, BaseState, createInitialState } from '../../../shared/store';
import { CourseViewModel } from '../models/course.view-model';

/**
 * CourseState interface extending BaseState
 * Manages course-specific state
 */
export interface CourseState extends BaseState<CourseViewModel[]> {
  selectedCourseId: number | null;
  searchQuery: string;
  filterSubject: string | null;
}

/**
 * Create initial course state
 */
function createInitialCourseState(): CourseState {
  return {
    ...createInitialState<CourseViewModel[]>([]),
    selectedCourseId: null,
    searchQuery: '',
    filterSubject: null,
  };
}

/**
 * CourseStore
 * Manages course state using Angular Signals
 *
 * This store extends BaseStore and follows the Store Pattern with Signals
 * as described in the design document. It provides reactive state management
 * for course-related data.
 */
@Injectable({
  providedIn: 'root',
})
export class CourseStore extends BaseStore<CourseViewModel[], CourseState> {
  // Private writable signals for course-specific state
  private readonly _selectedCourseId = signal<number | null>(null);
  private readonly _searchQuery = signal<string>('');
  private readonly _filterSubject = signal<string | null>(null);

  // Public readonly signals
  readonly selectedCourseId = this._selectedCourseId.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly filterSubject = this._filterSubject.asReadonly();

  // Computed signals - derived state from course data
  readonly courses = this.data; // Alias for better semantics
  readonly totalCourses = computed(() => this.filteredCourses().length ?? this.data()?.length ?? 0);

  readonly filteredCourses = computed(() => {
    const courses = this.data();
    if (!courses) return [];

    let filtered = courses;

    // Filter by subject
    const subject = this._filterSubject();
    if (subject) {
      filtered = filtered.filter((course) => course.subject === subject);
    }

    // Filter by search query
    const query = this._searchQuery().toLowerCase();
    if (query) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.overview.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  readonly selectedCourse = computed(() => {
    const courses = this.data();
    const selectedId = this._selectedCourseId();
    if (!courses || selectedId === null) return null;
    return courses.find((course) => course.id === selectedId) ?? null;
  });


  constructor() {
    super(createInitialCourseState());
  }

  /**
   * Set the list of courses
   * @param courses - Array of course view models
   */
  setCourses(courses: CourseViewModel[]): void {
    this.setData(courses);
  }


  /**
   * Select a course by ID
   * @param courseId - ID of the course to select
   */
  selectCourse(courseId: number | null): void {
    this._selectedCourseId.set(courseId);
    this.patchState({ selectedCourseId: courseId } as Partial<CourseState>);
  }

  /**
   * Set search query for filtering courses
   * @param query - Search query string
   */
  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
    this.patchState({ searchQuery: query } as Partial<CourseState>);
  }

  /**
   * Set subject filter
   * @param subject - Subject to filter by (null to clear filter)
   */
  setFilterSubject(subject: string | null): void {
    this._filterSubject.set(subject);
    this.patchState({ filterSubject: subject } as Partial<CourseState>);
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this._searchQuery.set('');
    this._filterSubject.set(null);
    this.patchState({
      searchQuery: '',
      filterSubject: null,
    } as Partial<CourseState>);
  }

  /**
   * Clear the course list
   */
  clearCourses(): void {
    this.setData([]);
  }

  /**
   * Reset the entire store to initial state
   */
  resetCourseStore(): void {
    this.reset(createInitialCourseState());
    this._selectedCourseId.set(null);
    this._searchQuery.set('');
    this._filterSubject.set(null);
  }
}
