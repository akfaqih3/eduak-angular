import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourseViewModel } from '../../models/course.view-model';
import { CardComponent } from '../../../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';
import { ClickOutsideDirective } from "../../../../directives";

/**
 * CourseCardComponent (Presentational Component)
 *
 * This is a presentational component that displays a single course card.
 * It receives course data via @Input and emits events via @Output.
 *
 * Responsibilities:
 * - Display course information in a card format
 * - Emit events for user interactions (edit, delete)
 * - No business logic or state management
 */
@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent {
  @Input({ required: true }) course!: CourseViewModel;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  /**
   * Handle edit button click
   * Prevents event propagation to avoid triggering card click
   *
   * @param event - Mouse event
   */
  onEdit(event: Event): void {
    event.stopPropagation();
    this.edit.emit();
  }

  /**
   * Handle delete button click
   * Prevents event propagation to avoid triggering card click
   *
   * @param event - Mouse event
   */
  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit();
  }
}
