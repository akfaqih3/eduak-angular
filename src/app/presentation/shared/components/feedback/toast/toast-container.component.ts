import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent, Toast, ToastPosition } from './toast.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div [class]="'toast-container toast-container-' + position()">
      @for (toast of toasts(); track toast.id) {
        <app-toast 
          [toast]="toast" 
          [position]="position()"
          (close)="onClose($event)"
        />
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      z-index: 10000;
      pointer-events: none;

      &.toast-container-top-right {
        top: 1rem;
        right: 1rem;
      }

      &.toast-container-top-left {
        top: 1rem;
        left: 1rem;
      }

      &.toast-container-bottom-right {
        bottom: 1rem;
        right: 1rem;
      }

      &.toast-container-bottom-left {
        bottom: 1rem;
        left: 1rem;
      }

      &.toast-container-top-center {
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
      }

      &.toast-container-bottom-center {
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
      }

      app-toast {
        pointer-events: auto;
      }
    }
  `]
})
export class ToastContainerComponent {
  toasts = input.required<Toast[]>();
  position = input<ToastPosition>('top-right');
  
  onClose(id: string): void {
    // This will be handled by the NotificationService
  }
}
