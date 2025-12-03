# MainLayout Component

## Overview
The MainLayout component provides the main application layout structure with a navbar, sidebar, and content area. It serves as the primary layout for authenticated users.

## Features
- **Responsive Design**: Adapts to different screen sizes
- **Collapsible Sidebar**: Toggle sidebar visibility
- **Mobile Overlay**: Sidebar overlay for mobile devices
- **Router Outlet**: Dynamic content rendering
- **RTL Support**: Full support for right-to-left languages

## Structure
```
┌─────────────────────────────────────┐
│           Navbar                    │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │   Main Content Area      │
│          │   (router-outlet)        │
│          │                          │
└──────────┴──────────────────────────┘
```

## Usage

### In Routes
```typescript
import { MainLayoutComponent } from './presentation/layouts';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component')
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.routes')
      }
    ]
  }
];
```

### Customization
You can customize the navigation items by modifying the `navItems` and `sidebarItems` arrays in the component:

```typescript
navItems: NavItem[] = [
  {
    label: 'الرئيسية',
    route: '/home',
    icon: 'home'
  }
];

sidebarItems: SidebarItem[] = [
  {
    label: 'لوحة التحكم',
    route: '/dashboard',
    icon: 'dashboard'
  }
];
```

## State Management
The component uses Angular Signals for reactive state management:
- `isSidebarOpen`: Controls sidebar visibility

## Methods
- `toggleSidebar()`: Toggles the sidebar open/closed state
- `closeSidebar()`: Closes the sidebar

## Responsive Behavior
- **Desktop (≥992px)**: Sidebar is visible by default, content adjusts margin
- **Mobile (<992px)**: Sidebar overlays content, can be toggled via navbar button

## Styling
The component uses SCSS with Bootstrap variables for consistent theming. It supports:
- Light/Dark mode
- RTL/LTR layouts
- Responsive breakpoints
- Custom spacing and colors

## Requirements Fulfilled
- **Requirement 7.1**: Layout contains `<router-outlet>` for dynamic content
- **Requirement 7.2**: Reusable layout structure with consistent UI
