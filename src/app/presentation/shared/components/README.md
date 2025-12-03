# Shared Components Documentation

This directory contains reusable UI components organized into three categories: UI, Feedback, and Navigation.

## UI Components

### Button Component
A versatile button component with multiple variants and states.

**Usage:**
```typescript
import { ButtonComponent } from './shared/components';

<app-button 
  variant="primary" 
  size="md" 
  [loading]="isLoading()"
  [disabled]="isDisabled()"
  (clicked)="handleClick($event)"
>
  Click Me
</app-button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `type`: 'button' | 'submit' | 'reset'
- `fullWidth`: boolean

### Input Component
A form input component with validation support and error display.

**Usage:**
```typescript
import { InputComponent } from './shared/components';

<app-input
  label="Email"
  type="email"
  placeholder="Enter your email"
  [error]="emailError()"
  [required]="true"
  formControlName="email"
/>
```

**Props:**
- `label`: string
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
- `placeholder`: string
- `error`: string | null
- `disabled`: boolean
- `required`: boolean
- `readonly`: boolean

### Card Component
A container component for organized content display.

**Usage:**
```typescript
import { CardComponent } from './shared/components';

<app-card 
  title="Card Title" 
  subtitle="Card subtitle"
  [elevated]="true"
  [hoverable]="true"
>
  <p>Card content goes here</p>
  <div card-footer>
    <app-button>Action</app-button>
  </div>
</app-card>
```

**Props:**
- `title`: string
- `subtitle`: string
- `elevated`: boolean (adds shadow)
- `padding`: boolean
- `hoverable`: boolean (adds hover effect)

## Feedback Components

### LoadingSpinner Component
A loading indicator with customizable size and optional message.

**Usage:**
```typescript
import { LoadingSpinnerComponent } from './shared/components';

<app-loading-spinner 
  size="md" 
  message="Loading data..."
  [overlay]="true"
/>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `message`: string
- `overlay`: boolean (full-screen overlay)

### ErrorMessage Component
An error display component with retry functionality.

**Usage:**
```typescript
import { ErrorMessageComponent } from './shared/components';

<app-error-message
  [message]="error()"
  type="error"
  [dismissible]="true"
  [showRetry]="true"
  (retry)="handleRetry()"
  (dismiss)="handleDismiss()"
/>
```

**Props:**
- `message`: string | null
- `type`: 'error' | 'warning' | 'info'
- `dismissible`: boolean
- `showRetry`: boolean

### Toast Component
A notification toast component for temporary messages.

**Usage:**
```typescript
import { ToastComponent, ToastContainerComponent } from './shared/components';

// In your component
toasts = signal<Toast[]>([]);

// In template
<app-toast-container 
  [toasts]="toasts()" 
  position="top-right"
/>
```

**Toast Interface:**
```typescript
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}
```

## Navigation Components

### Navbar Component
A top navigation bar with menu items and customizable content.

**Usage:**
```typescript
import { NavbarComponent } from './shared/components';

<app-navbar
  title="My App"
  logo="/assets/logo.png"
  [items]="navItems()"
  [showMenuToggle]="true"
  (menuToggle)="handleMenuToggle()"
>
  <!-- Custom content in navbar-end -->
  <app-button>Login</app-button>
</app-navbar>
```

**NavItem Interface:**
```typescript
interface NavItem {
  label: string;
  route?: string;
  icon?: string;
  children?: NavItem[];
}
```

### Sidebar Component
A collapsible sidebar navigation with nested menu support.

**Usage:**
```typescript
import { SidebarComponent } from './shared/components';

<app-sidebar
  [items]="sidebarItems()"
  [isOpen]="isSidebarOpen()"
  [collapsible]="true"
  (close)="handleClose()"
/>
```

**SidebarItem Interface:**
```typescript
interface SidebarItem {
  label: string;
  route?: string;
  icon?: string;
  badge?: string;
  children?: SidebarItem[];
}
```

### Breadcrumb Component
A breadcrumb navigation component showing the current page path.

**Usage:**
```typescript
import { BreadcrumbComponent } from './shared/components';

<app-breadcrumb
  [items]="breadcrumbItems()"
  separator="/"
  [showHome]="true"
/>
```

**BreadcrumbItem Interface:**
```typescript
interface BreadcrumbItem {
  label: string;
  route?: string;
  icon?: string;
}
```

## Styling

All components support dark mode through the `[data-theme='dark']` attribute on the root element. They use SCSS variables defined in `presentation/styles/_variables.scss`.

## Accessibility

All components are built with accessibility in mind:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Best Practices

1. **Use Signals**: All components use Angular Signals for reactive state management
2. **Standalone Components**: All components are standalone and can be imported individually
3. **Type Safety**: Use provided TypeScript interfaces for props
4. **Composition**: Components support content projection via `<ng-content>`
5. **Responsive**: Components are mobile-friendly and responsive by default
