import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api-config.provider';
import {
    ApiResponse,
    ListResponse,
    PaginatedResponse,
    SingleResponse,
} from '../models';
import { HttpOptionsBuilder, QueryParamsBuilder, UrlBuilder } from '../utils';
import { CrudOperations } from './crud-operations.interface';

/**
 * Base API Service
 * Abstract base class for all API services with common HTTP operations
 */
export abstract class BaseApiService<T, ID = string | number>
    implements CrudOperations<T, ID> {
    protected readonly http = inject(HttpClient);
    protected readonly config = inject(API_CONFIG);

    /**
     * Resource endpoint path (e.g., 'users', 'posts')
     * Must be defined by child classes
     */
    protected abstract resourcePath: string;

    /**
     * Get the full API URL for the resource
     */
    protected getResourceUrl(path?: string): string {
        const endpoint = path
            ? UrlBuilder.join(this.resourcePath, path)
            : this.resourcePath;

        return UrlBuilder.combine(this.config.baseUrl, endpoint);
    }

    /**
     * Get all items
     */
    getAll(params?: Record<string, any>): Observable<ListResponse<T>> {
        const url = this.getResourceUrl();
        const options = params
            ? HttpOptionsBuilder.create().setParams(params).build()
            : {};

        return this.http.get<ListResponse<T>>(url, { ...options, observe: 'body', responseType: 'json' });
    }

    /**
     * Get paginated items
     */
    getPaginated(
        page: number,
        pageSize: number,
        params?: Record<string, any>
    ): Observable<PaginatedResponse<T>> {
        const url = this.getResourceUrl();
        const httpParams = QueryParamsBuilder.buildPagination(page, pageSize);

        const options = HttpOptionsBuilder.create()
            .setParams({
                ...QueryParamsBuilder.toObject(httpParams),
                ...params,
            })
            .build();

        return this.http.get<PaginatedResponse<T>>(url, { ...options, observe: 'body', responseType: 'json' });
    }

    /**
     * Get item by ID
     */
    getById(id: ID): Observable<SingleResponse<T>> {
        const url = this.getResourceUrl(String(id));
        return this.http.get<SingleResponse<T>>(url);
    }

    /**
     * Create new item
     */
    create(item: Partial<T>): Observable<SingleResponse<T>> {
        const url = this.getResourceUrl();
        return this.http.post<SingleResponse<T>>(url, item);
    }

    /**
     * Update existing item
     */
    update(id: ID, item: Partial<T>): Observable<SingleResponse<T>> {
        const url = this.getResourceUrl(String(id));
        return this.http.put<SingleResponse<T>>(url, item);
    }

    /**
     * Partially update existing item
     */
    patch(id: ID, item: Partial<T>): Observable<SingleResponse<T>> {
        const url = this.getResourceUrl(String(id));
        return this.http.patch<SingleResponse<T>>(url, item);
    }

    /**
     * Delete item
     */
    delete(id: ID): Observable<ApiResponse<void>> {
        const url = this.getResourceUrl(String(id));
        return this.http.delete<ApiResponse<void>>(url);
    }

    /**
     * Execute GET request
     */
    protected get<R = any>(
        path: string,
        params?: Record<string, any>
    ): Observable<R> {
        const url = this.getResourceUrl(path);
        const options = params
            ? HttpOptionsBuilder.create().setParams(params).build()
            : {};

        return this.http.get<R>(url, { ...options, observe: 'body', responseType: 'json' });
    }

    /**
     * Execute POST request
     */
    protected post<R = any>(path: string, body?: any): Observable<R> {
        const url = this.getResourceUrl(path);
        return this.http.post<R>(url, body);
    }

    /**
     * Execute PUT request
     */
    protected put<R = any>(path: string, body?: any): Observable<R> {
        const url = this.getResourceUrl(path);
        return this.http.put<R>(url, body);
    }

    /**
     * Execute PATCH request
     */
    protected patchRequest<R = any>(path: string, body?: any): Observable<R> {
        const url = this.getResourceUrl(path);
        return this.http.patch<R>(url, body);
    }

    /**
     * Execute DELETE request
     */
    protected deleteRequest<R = any>(path: string): Observable<R> {
        const url = this.getResourceUrl(path);
        return this.http.delete<R>(url);
    }

    /**
     * Build URL with path parameters
     */
    protected buildUrl(
        template: string,
        pathParams?: Record<string, any>,
        queryParams?: Record<string, any>
    ): string {
        let url = UrlBuilder.build(template, pathParams);
        url = this.getResourceUrl(url);

        if (queryParams) {
            url = UrlBuilder.addQueryString(url, queryParams);
        }

        return url;
    }
}
