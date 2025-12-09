import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export type ErrorType = 'error' | 'warning' | 'info';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  message = input.required<string | null>();
  type = input<ErrorType>('error');
  dismissible = input<boolean>(false);
  showRetry = input<boolean>(false);
  
  retry = output<void>();
  dismiss = output<void>();

  onRetry(): void {
    this.retry.emit();
  }

  onDismiss(): void {
    this.dismiss.emit();
  }
}
