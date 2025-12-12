import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  route?: string;
  icon?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  title = input<string>('');
  logo = input<string>('');
  items = input<NavItem[]>([]);
  showMenuToggle = input<boolean>(true);
  
  menuToggle = output<void>();
  
  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  /**
   * TrackBy function for navbar items optimization
   * 
   * @param index - Index of the item
   * @param item - Nav item
   * @returns Unique identifier for the item
   */
  trackByItemLabel(index: number, item: NavItem): string {
    return item.label;
  }
}
