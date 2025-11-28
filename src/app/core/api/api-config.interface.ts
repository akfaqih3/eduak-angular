/**
 * API Configuration Interface
 * Defines the structure for API configuration settings
 */
export interface ApiConfig {
    /**
     * Base URL for the API
     * @example 'https://api.example.com/v1'
     */
    baseUrl: string;

    /**
     * Request timeout in milliseconds
     * @default 30000 (30 seconds)
     */
    timeout?: number;

    /**
     * Maximum number of retry attempts for failed requests
     * @default 3
     */
    maxRetries?: number;

    /**
     * Delay between retry attempts in milliseconds
     * @default 1000 (1 second)
     */
    retryDelay?: number;

    /**
     * Enable request/response logging
     * @default false in production
     */
    enableLogging?: boolean;

    /**
     * Custom headers to include in every request
     */
    defaultHeaders?: Record<string, string>;

    /**
     * Authentication configuration
     */
    auth?: {
        /**
         * Storage key for authentication token
         * @default 'auth_token'
         */
        tokenKey?: string;

        /**
         * Header name for authentication token
         * @default 'Authorization'
         */
        headerName?: string;

        /**
         * Token prefix (e.g., 'Bearer')
         * @default 'Bearer'
         */
        tokenPrefix?: string;

        /**
         * Endpoints that don't require authentication
         */
        excludedEndpoints?: string[];
    };
}

/**
 * Default API Configuration
 */
export const DEFAULT_API_CONFIG: Partial<ApiConfig> = {
    timeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
    enableLogging: false,
    auth: {
        tokenKey: 'auth_token',
        headerName: 'Authorization',
        tokenPrefix: 'Bearer',
        excludedEndpoints: ['/auth/login', '/auth/register', '/auth/refresh'],
    },
};
