# Auth Feature

This feature implements the authentication functionality for the application, following Clean Architecture principles and Angular best practices.

## Structure

```
auth/
├── pages/                      # Smart Components (Container)
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.scss
│   └── register/
│       ├── register.component.ts
│       ├── register.component.html
│       └── register.component.scss
├── components/                 # Presentational Components (Dumb)
│   ├── login-form/
│   │   ├── login-form.component.ts
│   │   ├── login-form.component.html
│   │   └── login-form.component.scss
│   └── register-form/
│       ├── register-form.component.ts
│       ├── register-form.component.html
│       └── register-form.component.scss
├── services/                   # State Management & Facade
│   ├── auth.store.ts          # State management with Signals
│   └── auth.facade.ts         # Facade for Use Cases
├── models/                     # ViewModels
│   ├── login.view-model.ts
│   ├── register.view-model.ts
│   └── user-profile.view-model.ts
├── forms/                      # Form utilities (empty for now)
└── auth.routes.ts             # Feature routes
```

## Components

### Smart Components (Pages)

#### LoginComponent
- **Type**: Smart/Container Component
- **Responsibilities**:
  - Handle login form submission
  - Interact with AuthFacade
  - Manage loading and error states
  - Navigate on successful login
- **Location**: `pages/login/`

#### RegisterComponent
- **Type**: Smart/Container Component
- **Responsibilities**:
  - Handle registration form submission
  - Interact with AuthFacade
  - Manage loading, error, and success states
  - Navigate to login after successful registration
- **Location**: `pages/register/`

### Presentational Components

#### LoginFormComponent
- **Type**: Presentational/Dumb Component
- **Responsibilities**:
  - Display login form with validation
  - Emit form submission event
  - Show validation errors
  - Handle form state
- **Inputs**: `submitting: boolean`
- **Outputs**: `submitForm: LoginViewModel`
- **Location**: `components/login-form/`

#### RegisterFormComponent
- **Type**: Presentational/Dumb Component
- **Responsibilities**:
  - Display registration form with validation
  - Emit form submission event
  - Show validation errors
  - Validate password confirmation
- **Inputs**: `submitting: boolean`
- **Outputs**: `submitForm: RegisterViewModel`
- **Location**: `components/register-form/`

## Services

### AuthStore
- **Pattern**: Store Pattern with Signals
- **Purpose**: Manages authentication state reactively
- **Features**:
  - User profile state
  - Authentication token
  - Computed signals (isAuthenticated, userRole, etc.)
  - State mutation methods

### AuthFacade
- **Pattern**: Facade Pattern
- **Purpose**: Simplifies interaction with domain use cases
- **Methods**:
  - `login(email, password)`: Authenticate user
  - `logout()`: Clear authentication state
  - `register(account)`: Register new user
  - `loadUserProfile()`: Fetch user profile
- **Exposes**: Reactive signals from AuthStore

## ViewModels

### LoginViewModel
```typescript
interface LoginViewModel {
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

### RegisterViewModel
```typescript
interface RegisterViewModel {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  role: RoleEnum;
  acceptTerms: boolean;
}
```

### UserProfileViewModel
```typescript
interface UserProfileViewModel {
  email: string;
  name: string;
  phone: string | null;
  photo: string;
  bio: string;
  role: RoleEnum;
  displayRole: string;
  isTeacher: boolean;
  isStudent: boolean;
}
```

## Routes

The auth feature is lazy-loaded with the following routes:

- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/auth` - Redirects to `/auth/login`

## Form Validation

### Login Form
- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters
- **Remember Me**: Optional checkbox

### Register Form
- **Name**: Required, minimum 3 characters
- **Email**: Required, valid email format
- **Phone**: Optional, 10-15 digits
- **Password**: Required, minimum 6 characters
- **Confirm Password**: Required, must match password
- **Role**: Required, Student or Teacher
- **Accept Terms**: Required (must be checked)

## Usage

### Integrating Auth Routes

Add to your main `app.routes.ts`:

```typescript
{
  path: 'auth',
  component: AuthLayoutComponent,
  loadChildren: () => import('./presentation/features/auth/auth.routes')
}
```

### Using AuthFacade in Components

```typescript
import { Component, inject } from '@angular/core';
import { AuthFacade } from './presentation/features/auth';

@Component({...})
export class MyComponent {
  private authFacade = inject(AuthFacade);

  // Access reactive state
  user = this.authFacade.user;
  isAuthenticated = this.authFacade.isAuthenticated;

  // Perform actions
  async login() {
    const success = await this.authFacade.login(email, password);
  }
}
```

## Design Patterns

1. **Smart & Presentational Components**: Separation of concerns between business logic and UI
2. **Facade Pattern**: Simplified interface to domain use cases
3. **Store Pattern with Signals**: Reactive state management
4. **ViewModel Pattern**: Transform domain entities for UI display
5. **Reactive Forms**: Type-safe form handling with validation

## Dependencies

- Angular Signals for reactive state
- Reactive Forms for form handling
- Shared UI components (Button, Input, Card)
- Shared feedback components (LoadingSpinner, ErrorMessage)
- Domain use cases (LoginUseCase, RegisterUseCase, etc.)

## Next Steps

- Add forgot password functionality
- Implement email verification
- Add social login options
- Enhance form validation with custom validators
- Add unit tests for components and services
