/**
 * Pagination Parameters
 */
export interface PaginationParams {
    /**
     * Page number (1-indexed)
     * @default 1
     */
    page: number;

    /**
     * Number of items per page
     * @default 10
     */
    pageSize: number;

    /**
     * Sort field
     */
    sortBy?: string;

    /**
     * Sort direction
     * @default 'asc'
     */
    sortOrder?: 'asc' | 'desc';
}

/**
 * Pagination Metadata
 */
export interface PaginationMeta {
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

    /**
     * Index of the first item on the current page
     */
    startIndex: number;

    /**
     * Index of the last item on the current page
     */
    endIndex: number;
}

/**
 * Default pagination parameters
 */
export const DEFAULT_PAGINATION: PaginationParams = {
    page: 1,
    pageSize: 10,
    sortOrder: 'asc',
};

/**
 * Helper to calculate pagination metadata
 */
export function calculatePaginationMeta(
    totalItems: number,
    currentPage: number,
    pageSize: number
): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    return {
        currentPage,
        totalPages,
        pageSize,
        totalItems,
        hasNext: currentPage < totalPages,
        hasPrevious: currentPage > 1,
        startIndex,
        endIndex,
    };
}
