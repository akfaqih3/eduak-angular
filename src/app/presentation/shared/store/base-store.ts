import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { BaseState, createInitialState } from './base-store.interface';

/**
 * Base Store class using Angular Signals for reactive state management
 * Provides common functionality for managing loading, error, and data states
 * 
 * @template T - The type of data managed by the store
 * 
 * @example
 * ```typescript
 * interface UserState extends BaseState<User[]> {
 *   selectedUserId: string | null;
 * }
 * 
 * class UserStore extends BaseStore<User[], UserState> {
 *   private _selectedUserId = signal<string | null>(null);
 *   readonly selectedUserId = this._selectedUserId.asReadonly();
 * 
 *   constructor() {
 *     super({ ...createInitialState<User[]>([]), selectedUserId: null });
 *   }
 * 
 *   selectUser(id: string): void {
 *     this._selectedUserId.set(id);
 *   }
 * }
 * ```
 */
export abstract class BaseStore<T = unknown, S extends BaseState<T> = BaseState<T>> {
  // Private writable signals
  private readonly _state: WritableSignal<S>;

  // Public readonly signals for individual state properties
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  readonly data: Signal<T | null>;

  // Computed signals
  readonly hasError: Signal<boolean>;
  readonly hasData: Signal<boolean>;
  readonly isIdle: Signal<boolean>;

  constructor(initialState: S) {
    this._state = signal(initialState);

    // Create derived signals for each state property
    this.loading = computed(() => this._state().loading);
    this.error = computed(() => this._state().error);
    this.data = computed(() => this._state().data);

    // Create computed signals for common state checks
    this.hasError = computed(() => this._state().error !== null);
    this.hasData = computed(() => this._state().data !== null);
    this.isIdle = computed(() => !this._state().loading && this._state().error === null);
  }

  /**
   * Get the complete current state
   */
  protected getState(): S {
    return this._state();
  }

  /**
   * Update the entire state
   */
  protected setState(state: S): void {
    this._state.set(state);
  }

  /**
   * Partially update the state
   */
  protected patchState(partialState: Partial<S>): void {
    this._state.update(current => ({ ...current, ...partialState }));
  }

  /**
   * Set loading state
   */
  protected setLoading(loading: boolean): void {
    this.patchState({ loading } as Partial<S>);
  }

  /**
   * Set error state and clear loading
   */
  protected setError(error: string | null): void {
    this.patchState({ error, loading: false } as Partial<S>);
  }

  /**
   * Set data and clear loading and error
   */
  protected setData(data: T | null): void {
    this.patchState({ data, loading: false, error: null } as Partial<S>);
  }

  /**
   * Clear error state
   */
  protected clearError(): void {
    this.patchState({ error: null } as Partial<S>);
  }

  /**
   * Reset store to initial state
   */
  protected reset(initialState: S): void {
    this.setState(initialState);
  }

  /**
   * Helper method to handle async operations with automatic loading/error management
   * 
   * @param operation - Async operation to execute
   * @param onSuccess - Optional callback when operation succeeds
   * @param onError - Optional callback when operation fails
   */
  protected async executeAsync<R>(
    operation: () => Promise<R>,
    onSuccess?: (result: R) => void,
    onError?: (error: Error) => void
  ): Promise<R | null> {
    this.setLoading(true);
    this.clearError();

    try {
      const result = await operation();
      onSuccess?.(result);
      this.setLoading(false);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      this.setError(errorMessage);
      onError?.(error instanceof Error ? error : new Error(errorMessage));
      return null;
    }
  }
}
