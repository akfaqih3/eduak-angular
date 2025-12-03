import { Component, input, output } from '@angular/core';
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
  styleUrl: './navbar.component.scss'
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
}
