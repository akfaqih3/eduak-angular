import { Observable } from 'rxjs';
import {
    ApiResponse,
    ListResponse,
    PaginatedResponse,
    SingleResponse,
} from '../models';

/**
 * CRUD Operations Interface
 * Defines standard CRUD operations contract
 */
export interface CrudOperations<T, ID = string | number> {
    /**
     * Get all items
     */
    getAll(params?: Record<string, any>): Observable<ListResponse<T>>;

    /**
     * Get paginated items
     */
    getPaginated(
        page: number,
        pageSize: number,
        params?: Record<string, any>
    ): Observable<PaginatedResponse<T>>;

    /**
     * Get item by ID
     */
    getById(id: ID): Observable<SingleResponse<T>>;

    /**
     * Create new item
     */
    create(item: Partial<T>): Observable<SingleResponse<T>>;

    /**
     * Update existing item
     */
    update(id: ID, item: Partial<T>): Observable<SingleResponse<T>>;

    /**
     * Delete item
     */
    delete(id: ID): Observable<ApiResponse<void>>;
}
