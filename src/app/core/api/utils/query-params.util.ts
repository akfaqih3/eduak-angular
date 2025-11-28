import { HttpParams } from '@angular/common/http';

/**
 * Query Parameters Builder Utility
 * Provides helper methods to build HTTP query parameters
 */
export class QueryParamsBuilder {
    /**
     * Build HttpParams from object
     * @param params Object containing parameter values
     * @returns HttpParams instance
     *
     * @example
     * QueryParamsBuilder.build({ page: 1, size: 10 })
     */
    static build(params?: Record<string, any>): HttpParams {
        let httpParams = new HttpParams();

        if (!params) {
            return httpParams;
        }

        Object.keys(params).forEach((key) => {
            const value = params[key];

            // Skip undefined and null values
            if (value === undefined || value === null) {
                return;
            }

            // Handle arrays
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    httpParams = httpParams.append(key, String(item));
                });
            }
            // Handle objects (convert to JSON string)
            else if (typeof value === 'object') {
                httpParams = httpParams.set(key, JSON.stringify(value));
            }
            // Handle primitive values
            else {
                httpParams = httpParams.set(key, String(value));
            }
        });

        return httpParams;
    }

    /**
     * Build query params from pagination settings
     * @param page Page number
     * @param pageSize Number of items per page
     * @param sortBy Sort field
     * @param sortOrder Sort direction
     * @returns HttpParams instance
     */
    static buildPagination(
        page?: number,
        pageSize?: number,
        sortBy?: string,
        sortOrder?: 'asc' | 'desc'
    ): HttpParams {
        const params: Record<string, any> = {};

        if (page !== undefined) {
            params['page'] = page;
        }

        if (pageSize !== undefined) {
            params['pageSize'] = pageSize;
        }

        if (sortBy) {
            params['sortBy'] = sortBy;
        }

        if (sortOrder) {
            params['sortOrder'] = sortOrder;
        }

        return this.build(params);
    }

    /**
     * Convert HttpParams to plain object
     * @param httpParams HttpParams instance
     * @returns Plain object
     */
    static toObject(httpParams: HttpParams): Record<string, any> {
        const result: Record<string, any> = {};

        httpParams.keys().forEach((key) => {
            const values = httpParams.getAll(key);

            if (values && values.length > 1) {
                result[key] = values;
            } else if (values && values.length === 1) {
                result[key] = values[0];
            }
        });

        return result;
    }

    /**
     * Merge multiple HttpParams instances
     * @param params Array of HttpParams instances
     * @returns Merged HttpParams instance
     */
    static merge(...params: HttpParams[]): HttpParams {
        let result = new HttpParams();

        params.forEach((param) => {
            param.keys().forEach((key) => {
                const values = param.getAll(key);
                if (values) {
                    values.forEach((value) => {
                        result = result.append(key, value);
                    });
                }
            });
        });

        return result;
    }
}
