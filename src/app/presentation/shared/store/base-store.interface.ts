/**
 * Base state interface that all stores should extend
 * Provides common state properties for loading, error, and data management
 */
export interface BaseState<T = unknown> {
  /**
   * Indicates if an async operation is in progress
   */
  loading: boolean;

  /**
   * Holds error message if an operation failed
   */
  error: string | null;

  /**
   * The main data managed by the store
   */
  data: T | null;
}

/**
 * Initial state factory for creating default state objects
 */
export function createInitialState<T = unknown>(data: T | null = null): BaseState<T> {
  return {
    loading: false,
    error: null,
    data
  };
}
