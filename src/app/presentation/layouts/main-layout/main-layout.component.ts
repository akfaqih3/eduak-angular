import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent, type NavItem } from '../../shared/components/navigation/navbar/navbar.component';
import { SidebarComponent, type SidebarItem } from '../../shared/components/navigation/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  // Sidebar state management
  isSidebarOpen = signal<boolean>(true);

  // Navigation items for navbar
  navItems: NavItem[] = [
    {
      label: 'الرئيسية',
      route: '/home',
      icon: 'home'
    },
    {
      label: 'المستخدمون',
      route: '/users',
      icon: 'people'
    }
  ];

  // Sidebar menu items
  sidebarItems: SidebarItem[] = [
    {
      label: 'لوحة التحكم',
      route: '/dashboard',
      icon: 'dashboard'
    },
    {
      label: 'المستخدمون',
      icon: 'people',
      children: [
        {
          label: 'قائمة المستخدمين',
          route: '/users',
          icon: 'list'
        },
        {
          label: 'إضافة مستخدم',
          route: '/users/new',
          icon: 'add'
        }
      ]
    },
    {
      label: 'الإعدادات',
      route: '/settings',
      icon: 'settings'
    }
  ];

  toggleSidebar(): void {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}
