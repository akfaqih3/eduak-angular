import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';
import { BaseStore } from '../store/base-store';

/**
 * Base Facade class that provides common functionality for feature facades
 * Serves as an abstraction layer between presentation components and domain use cases
 * 
 * Key responsibilities:
 * - Execute use cases from the domain layer
 * - Handle results and update store state accordingly
 * - Provide simplified methods for components
 * - Manage navigation and error handling
 * 
 * @template T - The type of data managed by the associated store
 * @template TStore - The type of store used by the facade
 * 
 * @example
 * ```typescript
 * class AuthFacade extends BaseFacade<User, AuthStore> {
 *   private loginUseCase = inject(LoginUseCase);
 * 
 *   constructor() {
 *     super(inject(AuthStore));
 *   }
 * 
 *   async login(email: string, password: string): Promise<boolean> {
 *     return this.executeUseCase(
 *       () => this.loginUseCase.execute(email, password),
 *       (user) => this.store.setUser(user)
 *     );
 *   }
 * }
 * ```
 */
export abstract class BaseFacade<T = unknown, TStore extends BaseStore<T> = BaseStore<T>> {
  protected readonly router = inject(Router);

  constructor(protected readonly store: TStore) {}

  /**
   * Expose store signals for reactive UI
   */
  get loading() {
    return this.store.loading;
  }

  get error() {
    return this.store.error;
  }

  get data() {
    return this.store.data;
  }

  get hasError() {
    return this.store.hasError;
  }

  get hasData() {
    return this.store.hasData;
  }

  get isIdle() {
    return this.store.isIdle;
  }

  /**
   * Execute a use case and handle the result
   * Automatically manages loading state and error handling
   * 
   * @param useCase - Function that returns a Promise with a Result
   * @param onSuccess - Optional callback to execute on success
   * @param onError - Optional callback to execute on error
   * @returns Promise<boolean> - true if successful, false otherwise
   */
  protected async executeUseCase<R>(
    useCase: () => Promise<Result<R, DomainError>>,
    onSuccess?: (data: R) => void,
    onError?: (error: DomainError) => void
  ): Promise<boolean> {
    const result = await (this.store as any).executeAsync(
      async () => {
        const useCaseResult = await useCase();
        if (useCaseResult.isFailure) {
          throw new Error(useCaseResult.error.message);
        }
        return useCaseResult.value;
      },
      onSuccess,
      (error:DomainError) => {
        onError?.(error);
      }
    );

    return result !== null;
  }

  /**
   * Execute a use case without automatic store state management
   * Useful when you need custom handling of the result
   * 
   * @param useCase - Function that returns a Promise with a Result
   * @returns Promise<Result<R, DomainError>>
   */
  protected async executeUseCaseRaw<R>(
    useCase: () => Promise<Result<R, DomainError>>
  ): Promise<Result<R, DomainError>> {
    return await useCase();
  }

  /**
   * Navigate to a specific route
   * 
   * @param path - Route path or array of route segments
   * @param extras - Optional navigation extras
   */
  protected navigate(path: string | any[], extras?: any): Promise<boolean> {
    const commands = Array.isArray(path) ? path : [path];
    return this.router.navigate(commands, extras);
  }

  /**
   * Navigate back in browser history
   */
  protected navigateBack(): void {
    window.history.back();
  }

  /**
   * Clear error state in the store
   */
  clearError(): void {
    (this.store as any).clearError();
  }
}
