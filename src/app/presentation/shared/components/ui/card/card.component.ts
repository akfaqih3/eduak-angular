import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  title = input<string>('');
  subtitle = input<string>('');
  elevated = input<boolean>(true);
  padding = input<boolean>(true);
  hoverable = input<boolean>(false);
}
