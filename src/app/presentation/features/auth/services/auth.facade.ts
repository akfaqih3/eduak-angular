import { Injectable, inject } from '@angular/core';
import { BaseFacade } from '../../../shared/services/base-facade';
import { AuthStore } from './auth.store';
import { LoginUseCase } from '../../../../domain/usecases/auth/login.usecase';
import { LogoutUseCase } from '../../../../domain/usecases/auth/logout.usecase';
import { RegisterUseCase } from '../../../../domain/usecases/account/register.usecase';
import { GetProfileUseCase } from '../../../../domain/usecases/account/get-profile.usecase';
import { UserProfileViewModel, toUserProfileViewModel } from '../models/user-profile.view-model';
import { AccountEntity } from '../../../../domain/entities/account.entity';
import { LoginResponse } from '../../../../data/models/auth.model';

/**
 * AuthFacade
 * Provides a simplified interface for authentication operations
 * 
 * This facade follows the Facade Pattern as described in the design document.
 * It acts as an abstraction layer between presentation components and domain use cases,
 * handling authentication logic and state management.
 * 
 * Key responsibilities:
 * - Execute authentication use cases (login, logout, register)
 * - Transform domain entities to view models
 * - Update AuthStore with authentication state
 * - Provide reactive signals for components
 * 
 * @example
 * ```typescript
 * // In a component
 * class LoginComponent {
 *   private authFacade = inject(AuthFacade);
 * 
 *   async onLogin(email: string, password: string) {
 *     const success = await this.authFacade.login(email, password);
 *     if (success) {
 *       this.router.navigate(['/dashboard']);
 *     }
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AuthFacade extends BaseFacade<UserProfileViewModel, AuthStore> {
  // Inject use cases
  private readonly loginUseCase = inject(LoginUseCase);
  private readonly logoutUseCase = inject(LogoutUseCase);
  private readonly registerUseCase = inject(RegisterUseCase);
  private readonly getProfileUseCase = inject(GetProfileUseCase);

  constructor() {
    super(inject(AuthStore));
  }

  // Expose auth-specific signals from the store
  readonly user = this.store.user;
  readonly token = this.store.token;
  readonly isAuthenticated = this.store.isAuthenticated;
  readonly userRole = this.store.userRole;
  readonly isTeacher = this.store.isTeacher;
  readonly isStudent = this.store.isStudent;
  readonly userName = this.store.userName;
  readonly userEmail = this.store.userEmail;
  readonly userPhoto = this.store.userPhoto;

  /**
   * Login with email and password
   * 
   * @param email - User email
   * @param password - User password
   * @returns Promise<boolean> - true if login successful, false otherwise
   */
  async login(email: string, password: string): Promise<boolean> {
    const success = await this.executeUseCase(
      () => this.loginUseCase.execute(email, password),
      async (loginResponse: LoginResponse) => {
        // Store the token
        this.store.setAuthToken(loginResponse.access);
        
        // Fetch user profile after successful login
        await this.loadUserProfile();
      }
    );

    return success;
  }

  /**
   * Logout the current user
   * Clears authentication state and navigates to login page
   * 
   * @returns Promise<boolean> - true if logout successful, false otherwise
   */
  async logout(): Promise<boolean> {
    const success = await this.executeUseCase(
      () => this.logoutUseCase.execute(),
      () => {
        // Clear auth state
        this.store.logout();
        
        // Navigate to login page
        this.navigate(['/auth/login']);
      }
    );

    return success;
  }

  /**
   * Register a new user account
   * 
   * @param account - Account entity with registration data
   * @returns Promise<boolean> - true if registration successful, false otherwise
   */
  async register(account: AccountEntity): Promise<boolean> {
    const success = await this.executeUseCase(
      () => this.registerUseCase.execute(account),
      (registeredAccount: AccountEntity) => {
        // Convert to view model and store
        const userViewModel = toUserProfileViewModel(registeredAccount);
        this.store.setUser(userViewModel);
        
        // Navigate to login or dashboard based on requirements
        this.navigate(['/auth/login']);
      }
    );

    return success;
  }

  /**
   * Load the current user's profile
   * Typically called after login or on app initialization
   * 
   * @returns Promise<boolean> - true if profile loaded successfully, false otherwise
   */
  async loadUserProfile(): Promise<boolean> {
    const success = await this.executeUseCase(
      () => this.getProfileUseCase.execute(),
      (account: AccountEntity) => {
        // Convert to view model and store
        const userViewModel = toUserProfileViewModel(account);
        this.store.setUser(userViewModel);
      }
    );

    return success;
  }

  /**
   * Update user profile partially
   * Useful for updating specific fields without refetching
   * 
   * @param updates - Partial user profile updates
   */
  updateUserProfile(updates: Partial<UserProfileViewModel>): void {
    this.store.updateUser(updates);
  }

  /**
   * Check if user is authenticated
   * Convenience method that returns the current authentication state
   * 
   * @returns boolean - true if user is authenticated
   */
  checkAuthentication(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Clear authentication state without calling logout API
   * Useful for handling token expiration or forced logout
   */
  clearAuthState(): void {
    this.store.resetAuth();
  }
}
