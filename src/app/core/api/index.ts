// API Configuration
export * from './api-config.interface';
export * from './api-config.provider';

// API Models - Explicit exports to avoid conflicts
export type {
    ApiRequest,
    PaginatedRequest,
    SearchRequest,
} from './models/api-request.model';

export type {
    ApiResponse,
    PaginatedResponse,
    SingleResponse,
    ListResponse,
} from './models/api-response.model';

export type {
    PaginationParams,
    PaginationMeta,
} from './models/pagination.model';

export { DEFAULT_PAGINATION, calculatePaginationMeta } from './models/pagination.model';

export { HttpErrorCode } from './models/api-error.model';
export type { ApiErrorResponse } from './models/api-error.model';
export type { ValidationError as ApiValidationError } from './models/api-error.model';
export type { NetworkError as ApiNetworkError } from './models/api-error.model';
export { ApiError } from './models/api-error.model';

// Interceptors
export * from './interceptors';

// Services
export * from './services';

// Utilities
export * from './utils';

// Providers
export * from './api.providers';
