import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../components/feedback/toast/toast.component';

/**
 * NotificationService
 * Manages toast notifications throughout the application
 * 
 * This service provides a centralized way to display notifications
 * to users for success, error, warning, and info messages.
 * 
 * @example
 * ```typescript
 * class MyComponent {
 *   private notificationService = inject(NotificationService);
 * 
 *   showSuccess() {
 *     this.notificationService.success('تم الحفظ بنجاح');
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private idCounter = 0;

  /**
   * Show a toast notification
   * @param message - Message to display
   * @param type - Type of notification
   * @param duration - Duration in milliseconds (default: 5000)
   */
  show(message: string, type: ToastType = 'info', duration: number = 5000): void {
    const id = `toast-${++this.idCounter}`;
    const toast: Toast = { id, message, type, duration };

    this._toasts.update(toasts => [...toasts, toast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  /**
   * Show a success notification
   * @param message - Success message
   * @param duration - Duration in milliseconds
   */
  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  /**
   * Show an error notification
   * @param message - Error message
   * @param duration - Duration in milliseconds
   */
  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  /**
   * Show a warning notification
   * @param message - Warning message
   * @param duration - Duration in milliseconds
   */
  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Show an info notification
   * @param message - Info message
   * @param duration - Duration in milliseconds
   */
  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  /**
   * Remove a toast by ID
   * @param id - Toast ID to remove
   */
  remove(id: string): void {
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this._toasts.set([]);
  }
}
