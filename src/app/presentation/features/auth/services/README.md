# Auth Services

This directory contains authentication-related services following the Clean Architecture pattern.

## AuthStore

The `AuthStore` manages authentication state using Angular Signals. It extends `BaseStore` and provides:

- User profile state
- Authentication token state
- Computed signals for authentication status, user role, etc.
- Methods to update authentication state

### Usage Example

```typescript
import { AuthStore } from './auth.store';

@Component({...})
export class SomeComponent {
  private authStore = inject(AuthStore);
  
  // Access reactive state
  user = this.authStore.user;
  isAuthenticated = this.authStore.isAuthenticated;
  userRole = this.authStore.userRole;
}
```

## AuthFacade

The `AuthFacade` provides a simplified interface for authentication operations. It follows the Facade Pattern and acts as an abstraction layer between presentation components and domain use cases.

### Key Features

- **Login**: Authenticate users with email and password
- **Logout**: Clear authentication state and navigate to login
- **Register**: Create new user accounts
- **Load Profile**: Fetch current user profile
- **Update Profile**: Update user profile data

### Usage Example

```typescript
import { AuthFacade } from './auth.facade';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="email" type="email" />
      <input [(ngModel)]="password" type="password" />
      <button type="submit" [disabled]="loading()">
        تسجيل الدخول
      </button>
      @if (error()) {
        <div class="error">{{ error() }}</div>
      }
    </form>
  `
})
export class LoginComponent {
  private authFacade = inject(AuthFacade);
  
  // Access reactive state
  loading = this.authFacade.loading;
  error = this.authFacade.error;
  isAuthenticated = this.authFacade.isAuthenticated;
  
  email = '';
  password = '';
  
  async onSubmit() {
    const success = await this.authFacade.login(this.email, this.password);
    
    if (success) {
      // Navigate to dashboard or home
      this.router.navigate(['/dashboard']);
    }
  }
}
```

### Available Methods

#### `login(email: string, password: string): Promise<boolean>`
Authenticates a user with email and password. Returns `true` on success.

```typescript
const success = await authFacade.login('user@example.com', 'password123');
if (success) {
  // Handle successful login
}
```

#### `logout(): Promise<boolean>`
Logs out the current user and navigates to the login page.

```typescript
await authFacade.logout();
```

#### `register(account: AccountEntity): Promise<boolean>`
Registers a new user account.

```typescript
const account: AccountEntity = {
  email: 'newuser@example.com',
  name: 'New User',
  phone: '1234567890',
  photo: '',
  bio: '',
  role: RoleEnum.Student
};

const success = await authFacade.register(account);
```

#### `loadUserProfile(): Promise<boolean>`
Fetches the current user's profile from the server.

```typescript
await authFacade.loadUserProfile();
```

#### `updateUserProfile(updates: Partial<UserProfileViewModel>): void`
Updates the user profile in the store without making an API call.

```typescript
authFacade.updateUserProfile({ name: 'Updated Name' });
```

#### `checkAuthentication(): boolean`
Returns the current authentication status.

```typescript
if (authFacade.checkAuthentication()) {
  // User is authenticated
}
```

#### `clearAuthState(): void`
Clears authentication state without calling the logout API. Useful for handling token expiration.

```typescript
authFacade.clearAuthState();
```

### Available Signals

The facade exposes the following reactive signals:

- `user` - Current user profile
- `token` - Authentication token
- `isAuthenticated` - Whether user is authenticated
- `userRole` - Current user's role
- `isTeacher` - Whether user is a teacher
- `isStudent` - Whether user is a student
- `userName` - User's display name
- `userEmail` - User's email
- `userPhoto` - User's profile photo URL
- `loading` - Loading state
- `error` - Error message (if any)

## Architecture

```
Component (Smart)
    ↓
AuthFacade (Presentation Layer)
    ↓
Use Cases (Domain Layer)
    ↓
Repository (Domain Layer)
    ↓
Data Source (Data Layer)
```

The facade pattern ensures:
- Components don't directly depend on use cases
- Consistent error handling and loading states
- Simplified API for common operations
- Easy to test and mock
