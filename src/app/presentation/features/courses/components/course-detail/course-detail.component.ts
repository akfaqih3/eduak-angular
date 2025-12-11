import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CourseViewModel } from '../../models/course.view-model';
import { CardComponent } from '../../../../shared/components/ui/card/card.component';

/**
 * CourseDetailComponent (Presentational Component)
 *
 * This is a presentational component that displays detailed course information.
 * It receives course data via @Input and emits events via @Output.
 *
 * Responsibilities:
 * - Display comprehensive course information
 * - Display course statistics (placeholder for now)
 * - Emit events for user interactions (edit, delete)
 * - No business logic or state management
 */
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  @Input({ required: true }) course!: CourseViewModel;

}
