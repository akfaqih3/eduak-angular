import { Injectable, signal, computed } from '@angular/core';

/**
 * LoadingService
 * Manages global loading state for HTTP requests
 * 
 * This service tracks active HTTP requests and provides
 * a reactive signal to show/hide loading indicators.
 * 
 * The service uses a counter to track multiple simultaneous requests,
 * ensuring the loading indicator stays visible until all requests complete.
 * 
 * @example
 * ```typescript
 * class AppComponent {
 *   private loadingService = inject(LoadingService);
 *   isLoading = this.loadingService.isLoading;
 * 
 *   // In template:
 *   // @if (isLoading()) { <app-loading-spinner /> }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly _activeRequests = signal<number>(0);
  
  /**
   * Computed signal that returns true if any requests are active
   */
  readonly isLoading = computed(() => this._activeRequests() > 0);

  /**
   * Get the current number of active requests
   */
  readonly activeRequestCount = this._activeRequests.asReadonly();

  /**
   * Increment the active request counter
   * Called when a new HTTP request starts
   */
  show(): void {
    this._activeRequests.update(count => count + 1);
  }

  /**
   * Decrement the active request counter
   * Called when an HTTP request completes (success or error)
   */
  hide(): void {
    this._activeRequests.update(count => Math.max(0, count - 1));
  }

  /**
   * Reset the counter to zero
   * Useful for error recovery or manual reset
   */
  reset(): void {
    this._activeRequests.set(0);
  }

  /**
   * Force set loading state
   * @param loading - Whether to show loading indicator
   */
  setLoading(loading: boolean): void {
    this._activeRequests.set(loading ? 1 : 0);
  }
}
