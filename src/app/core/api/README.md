# API Infrastructure

A complete, reusable API infrastructure for Angular applications following SOLID principles and clean architecture patterns.

## 📁 Structure

```
api/
├── models/              # Request/Response interfaces
│   ├── api-request.model.ts
│   ├── api-response.model.ts
│   ├── pagination.model.ts
│   ├── api-error.model.ts
│   └── index.ts
├── interceptors/        # HTTP interceptors
│   ├── auth.interceptor.ts
│   ├── error.interceptor.ts
│   ├── logging.interceptor.ts
│   └── index.ts
├── services/           # Base services
│   ├── base-api.service.ts
│   ├── crud-operations.interface.ts
│   └── index.ts
├── utils/              # Utility classes
│   ├── url-builder.util.ts
│   ├── query-params.util.ts
│   ├── http-options.util.ts
│   └── index.ts
├── api-config.interface.ts
├── api-config.provider.ts
├── api.providers.ts
├── index.ts
└── README.md
```

## 🚀 Quick Start

### 1. Configure in `app.config.ts`

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideApi } from './core/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideApi({
      baseUrl: 'https://api.example.com/v1',
      enableLogging: true, // Enable in development
      timeout: 30000,
      auth: {
        tokenKey: 'auth_token',
        headerName: 'Authorization',
        tokenPrefix: 'Bearer',
        excludedEndpoints: ['/auth/login', '/auth/register'],
      },
    }),
    // ... other providers
  ],
};
```

### 2. Create a Service

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService, SingleResponse, ListResponse } from '@core/api';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService extends BaseApiService<User, number> {
  protected override resourcePath = 'users';

  // Custom methods
  getUserByEmail(email: string): Observable<SingleResponse<User>> {
    return this.get<SingleResponse<User>>(`search`, { email });
  }

  getActiveUsers(): Observable<ListResponse<User>> {
    return this.getAll({ status: 'active' });
  }
}
```

### 3. Use in Components

```typescript
import { Component, inject } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-users',
  template: `
    <div *ngFor="let user of users">
      {{ user.name }} - {{ user.email }}
    </div>
  `,
})
export class UsersComponent {
  private userService = inject(UserService);
  users: User[] = [];

  ngOnInit() {
    // Get all users
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (error: ApiError) => {
        console.error('Error loading users:', error.message);
      },
    });

    // Get paginated users
    this.userService.getPaginated(1, 10).subscribe({
      next: (response) => {
        this.users = response.data;
        console.log('Total pages:', response.pagination.totalPages);
      },
    });

    // Create user
    this.userService.create({ name: 'John', email: 'john@example.com' }).subscribe({
      next: (response) => {
        console.log('User created:', response.data);
      },
    });
  }
}
```

## 📦 Features

### ✅ Base API Service

The `BaseApiService` provides CRUD operations out of the box:

- `getAll(params?)` - Get all items with optional filters
- `getPaginated(page, pageSize, params?)` - Get paginated results
- `getById(id)` - Get single item by ID
- `create(item)` - Create new item
- `update(id, item)` - Update existing item
- `patch(id, item)` - Partially update item
- `delete(id)` - Delete item

Protected helper methods for custom operations:

- `get(path, params?)` - Custom GET request
- `post(path, body?)` - Custom POST request
- `put(path, body?)` - Custom PUT request
- `patchRequest(path, body?)` - Custom PATCH request
- `deleteRequest(path)` - Custom DELETE request
- `buildUrl(template, pathParams?, queryParams?)` - Build URLs with parameters

### 🔐 Authentication Interceptor

Automatically adds JWT tokens to requests:

```typescript
// Token is read from localStorage and added to headers
// Configurable via ApiConfig
auth: {
  tokenKey: 'auth_token',
  headerName: 'Authorization',
  tokenPrefix: 'Bearer',
  excludedEndpoints: ['/auth/login'],
}
```

### ❌ Error Interceptor

Centralized error handling with user-friendly messages:

```typescript
// Automatically converts HTTP errors to ApiError instances
this.userService.getById(123).subscribe({
  error: (error: ApiError) => {
    if (error.isAuthError()) {
      // Redirect to login
    } else if (error.isValidationError()) {
      // Show validation errors
      error.errors?.forEach(err => {
        console.log(`${err.field}: ${err.message}`);
      });
    }
  },
});
```

### 📊 Logging Interceptor

Logs all HTTP requests and responses (disabled in production):

```typescript
provideApi({
  baseUrl: 'https://api.example.com',
  enableLogging: !environment.production, // Only in development
});
```

### 🔧 Utilities

#### URL Builder

```typescript
import { UrlBuilder } from '@core/api';

// Build URL with path parameters
UrlBuilder.build('/users/{id}/posts/{postId}', { id: 1, postId: 2 });
// Result: '/users/1/posts/2'

// Join URL segments
UrlBuilder.join('api', 'users', '123');
// Result: 'api/users/123'

// Combine base URL with path
UrlBuilder.combine('https://api.example.com', '/users');
// Result: 'https://api.example.com/users'

// Add query string
UrlBuilder.addQueryString('/users', { page: 1, size: 10 });
// Result: '/users?page=1&size=10'
```

#### Query Params Builder

```typescript
import { QueryParamsBuilder } from '@core/api';

// Build HttpParams from object
const params = QueryParamsBuilder.build({
  page: 1,
  size: 10,
  tags: ['angular', 'typescript'], // Arrays supported
});

// Build pagination params
const paginationParams = QueryParamsBuilder.buildPagination(1, 10, 'createdAt', 'desc');

// Convert to plain object
const obj = QueryParamsBuilder.toObject(params);
```

#### HTTP Options Builder

```typescript
import { HttpOptionsBuilder } from '@core/api';

// Fluent API
const options = HttpOptionsBuilder.create()
  .setHeaders({ 'Custom-Header': 'value' })
  .setParams({ page: 1 })
  .enableReportProgress()
  .build();

// Shortcuts
const jsonOptions = HttpOptionsBuilder.json({ page: 1 });
const uploadOptions = HttpOptionsBuilder.upload(true);
```

## 🎯 Advanced Usage

### Custom Service with Additional Methods

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService extends BaseApiService<Product, number> {
  protected override resourcePath = 'products';

  searchProducts(query: string): Observable<ListResponse<Product>> {
    return this.get<ListResponse<Product>>('search', { q: query });
  }

  getFeatured(): Observable<ListResponse<Product>> {
    return this.get<ListResponse<Product>>('featured');
  }

  uploadImage(productId: number, file: File): Observable<SingleResponse<Product>> {
    const formData = new FormData();
    formData.append('image', file);
    return this.post<SingleResponse<Product>>(`${productId}/image`, formData);
  }
}
```

### Using Path Parameters

```typescript
@Injectable({ providedIn: 'root' })
export class CommentService extends BaseApiService<Comment, number> {
  protected override resourcePath = 'posts/{postId}/comments';

  getCommentsByPost(postId: number): Observable<ListResponse<Comment>> {
    const url = this.buildUrl('posts/{postId}/comments', { postId });
    return this.http.get<ListResponse<Comment>>(url);
  }
}
```

### Environment-based Configuration

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com/v1',
};

// app.config.ts
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideApi({
      baseUrl: environment.apiUrl,
      enableLogging: !environment.production,
    }),
  ],
};
```

### Custom Interceptors

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

const customInterceptor: HttpInterceptorFn = (req, next) => {
  // Custom logic
  return next(req);
};

// Add to configuration
provideApi(
  { baseUrl: 'https://api.example.com' },
  [customInterceptor] // Custom interceptors
);
```

## 📋 Type Safety

All models are fully typed with TypeScript:

```typescript
// Request interfaces
interface ApiRequest { ... }
interface PaginatedRequest extends ApiRequest { ... }
interface SearchRequest extends PaginatedRequest { ... }

// Response interfaces
interface ApiResponse<T> { ... }
interface SingleResponse<T> extends ApiResponse<T> { ... }
interface ListResponse<T> extends ApiResponse<T[]> { ... }
interface PaginatedResponse<T> extends ApiResponse<T[]> { ... }

// Error interfaces
class ApiError extends Error {
  isValidationError(): boolean
  isAuthError(): boolean
  isForbiddenError(): boolean
  isNotFoundError(): boolean
  isServerError(): boolean
}
```

## 🔄 Migration to Other Projects

To use this API infrastructure in another Angular project:

1. **Copy the `api` folder** to your new project's `core` directory
2. **Configure in `app.config.ts`**:
   ```typescript
   import { provideApi } from './core/api';
   
   export const appConfig: ApplicationConfig = {
     providers: [
       provideApi({
         baseUrl: 'YOUR_API_URL',
         enableLogging: true,
       }),
     ],
   };
   ```
3. **Create services** extending `BaseApiService`
4. **Start using** in your components!

## 📝 Best Practices

1. **Always extend `BaseApiService`** for API services
2. **Use type parameters** for type safety: `BaseApiService<User, number>`
3. **Define `resourcePath`** in child services
4. **Use protected methods** (`get`, `post`, etc.) for custom operations
5. **Handle errors** using `ApiError` methods
6. **Configure per environment** using environment files
7. **Disable logging** in production for performance

## 🛠️ Configuration Options

```typescript
interface ApiConfig {
  baseUrl: string;                    // Required: API base URL
  timeout?: number;                   // Request timeout (default: 30000ms)
  maxRetries?: number;                // Max retry attempts (default: 3)
  retryDelay?: number;                // Delay between retries (default: 1000ms)
  enableLogging?: boolean;            // Enable logging (default: false)
  defaultHeaders?: Record<string, string>; // Custom default headers
  auth?: {
    tokenKey?: string;                // Storage key (default: 'auth_token')
    headerName?: string;              // Header name (default: 'Authorization')
    tokenPrefix?: string;             // Token prefix (default: 'Bearer')
    excludedEndpoints?: string[];     // Skip auth for these endpoints
  };
}
```

## 📚 Examples

Check the inline examples throughout this README for common use cases.

## 🤝 Contributing

This is a reusable module - feel free to extend and customize for your needs!

## 📄 License

Part of the Eduak Angular project.
