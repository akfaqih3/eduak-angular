import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CourseViewModel } from '../../models/course.view-model';
import { CourseCardComponent } from '../course-card/course-card.component';

/**
 * CourseListComponent (Presentational Component)
 * 
 * This is a presentational/dumb component that displays a list of courses.
 * It receives data via @Input and emits events via @Output.
 * 
 * Responsibilities:
 * - Display list of course cards
 * - Emit events for user interactions
 * - No business logic or state management
 */
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent {
  @Input({ required: true }) courses: CourseViewModel[] = [];
  @Output() courseSelected = new EventEmitter<number>();
  @Output() editCourse = new EventEmitter<number>();
  @Output() deleteCourse = new EventEmitter<number>();

  /**
   * Handle course card click
   * 
   * @param courseId - ID of the clicked course
   */
  onCourseClick(courseId: number): void {
    this.courseSelected.emit(courseId);
  }

  /**
   * Handle edit course action
   * 
   * @param courseId - ID of the course to edit
   */
  onEditCourse(courseId: number): void {
    this.editCourse.emit(courseId);
  }

  /**
   * Handle delete course action
   * 
   * @param courseId - ID of the course to delete
   */
  onDeleteCourse(courseId: number): void {
    this.deleteCourse.emit(courseId);
  }

  /**
   * TrackBy function for ngFor optimization
   * 
   * @param index - Index of the item
   * @param course - Course item
   * @returns Unique identifier for the course
   */
  trackByCourseId(index: number, course: CourseViewModel): number {
    return course.id;
  }
}
