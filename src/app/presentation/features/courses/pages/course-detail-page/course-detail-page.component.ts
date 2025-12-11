import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseFacade } from '../../services/course.facade';
import { CourseDetailComponent } from '../../components/course-detail/course-detail.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/feedback/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../../shared/components/feedback/error-message/error-message.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

/**
 * CourseDetailPageComponent (Smart Component)
 *
 * This is a container/smart component that handles the business logic
 * for displaying course details. It interacts with CourseFacade to load
 * course data and handle actions.
 *
 * Responsibilities:
 * - Load course details by ID
 * - Handle edit and delete actions
 * - Manage loading and error states
 * - Navigate to other pages
 * - Display presentational CourseDetailComponent
 */
@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [
    CourseDetailComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    ButtonComponent,
  ],
  templateUrl: './course-detail-page.component.html',
  styleUrl: './course-detail-page.component.scss',
})
export class CourseDetailPageComponent implements OnInit {
  private readonly courseFacade = inject(CourseFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Component state
  readonly courseId = signal<number | null>(null);

  // Expose facade signals
  readonly selectedCourse = this.courseFacade.selectedCourse;
  readonly loading = this.courseFacade.loading;
  readonly error = this.courseFacade.error;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.courseId.set(Number(id));
      this.loadCourse(Number(id));
    } else {
      // No ID provided, navigate back to list
      this.router.navigate(['/courses']);
    }
  }

  /**
   * Load course details
   *
   * @param courseId - ID of the course to load
   */
  async loadCourse(courseId: number): Promise<void> {
    await this.courseFacade.loadCourse(courseId);
  }

  /**
   * Navigate back to course list
   */
  onBackToList(): void {
    this.router.navigate(['/courses']);
  }

  /**
   * Retry loading course on error
   */
  onRetry(): void {
    if (this.courseId()) {
      this.loadCourse(this.courseId()!);
    }
  }
}
