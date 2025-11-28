/**
 * Base API Response Interface
 */
export interface ApiResponse<T = any> {
    /**
     * Response data
     */
    data: T;

    /**
     * Response message
     */
    message?: string;

    /**
     * Response status code
     */
    statusCode?: number;

    /**
     * Response timestamp
     */
    timestamp?: string;

    /**
     * Success indicator
     */
    success: boolean;
}

/**
 * Paginated Response Interface
 */
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
    /**
     * Pagination metadata
     */
    pagination: {
        /**
         * Current page number
         */
        currentPage: number;

        /**
         * Total number of pages
         */
        totalPages: number;

        /**
         * Number of items per page
         */
        pageSize: number;

        /**
         * Total number of items
         */
        totalItems: number;

        /**
         * Whether there is a next page
         */
        hasNext: boolean;

        /**
         * Whether there is a previous page
         */
        hasPrevious: boolean;
    };
}

/**
 * Single Item Response Interface
 */
export interface SingleResponse<T = any> extends ApiResponse<T> { }

/**
 * List Response Interface
 */
export interface ListResponse<T = any> extends ApiResponse<T[]> {
    /**
     * Total count of items
     */
    count?: number;
}
