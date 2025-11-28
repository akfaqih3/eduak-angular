/**
 * Base API Request Interface
 */
export interface ApiRequest {
    /**
     * Request headers
     */
    headers?: Record<string, string>;

    /**
     * Query parameters
     */
    params?: Record<string, any>;

    /**
     * Request timeout override
     */
    timeout?: number;
}

/**
 * Paginated Request Interface
 */
export interface PaginatedRequest extends ApiRequest {
    /**
     * Page number (1-indexed)
     */
    page?: number;

    /**
     * Number of items per page
     */
    pageSize?: number;

    /**
     * Sort field
     */
    sortBy?: string;

    /**
     * Sort direction
     */
    sortOrder?: 'asc' | 'desc';
}

/**
 * Search Request Interface
 */
export interface SearchRequest extends PaginatedRequest {
    /**
     * Search query string
     */
    query?: string;

    /**
     * Search filters
     */
    filters?: Record<string, any>;
}
