import { Injectable, signal, computed } from '@angular/core';
import { BaseStore, BaseState, createInitialState } from '../../../shared/store';
import { UserProfileViewModel } from '../models/user-profile.view-model';
import { RoleEnum } from '../../../../domain/entities/account.entity';

/**
 * AuthState interface extending BaseState
 * Manages authentication-specific state
 */
export interface AuthState extends BaseState<UserProfileViewModel> {
  token: string | null;
}

/**
 * Create initial auth state
 */
function createInitialAuthState(): AuthState {
  return {
    ...createInitialState<UserProfileViewModel>(null),
    token: null
  };
}

/**
 * AuthStore
 * Manages authentication state using Angular Signals
 * 
 * This store extends BaseStore and follows the Store Pattern with Signals
 * as described in the design document. It provides reactive state management
 * for authentication-related data.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthStore extends BaseStore<UserProfileViewModel, AuthState> {
  // Private writable signal for token
  private readonly _token = signal<string | null>(null);

  // Public readonly signal for token
  readonly token = this._token.asReadonly();

  // Computed signals - derived state from user data
  readonly user = this.data; // Alias for better semantics
  readonly isAuthenticated = computed(() => this.data() !== null && this._token() !== null);
  readonly userRole = computed(() => this.data()?.role ?? RoleEnum.Student);
  readonly isTeacher = computed(() => this.data()?.isTeacher ?? false);
  readonly isStudent = computed(() => this.data()?.isStudent ?? false);
  readonly userName = computed(() => this.data()?.name ?? 'مستخدم');
  readonly userEmail = computed(() => this.data()?.email ?? '');
  readonly userPhoto = computed(() => this.data()?.photo ?? '/assets/default-avatar.png');

  constructor() {
    super(createInitialAuthState());
  }

  /**
   * Set the authenticated user
   * @param user - User profile view model
   */
  setUser(user: UserProfileViewModel): void {
    this.setData(user); // Uses BaseStore method
  }

  /**
   * Clear the authenticated user (logout)
   */
  clearUser(): void {
    this.setData(null);
    this._token.set(null);
    this.clearError();
  }

  /**
   * Set authentication token
   * @param token - JWT or authentication token
   */
  setAuthToken(token: string): void {
    this._token.set(token);
    this.patchState({ token } as Partial<AuthState>);
  }

  /**
   * Clear authentication token
   */
  clearToken(): void {
    this._token.set(null);
    this.patchState({ token: null } as Partial<AuthState>);
  }

  /**
   * Update user profile partially
   * @param updates - Partial user profile updates
   */
  updateUser(updates: Partial<UserProfileViewModel>): void {
    const currentUser = this.data();
    if (currentUser) {
      this.setData({ ...currentUser, ...updates });
    }
  }

  /**
   * Reset the entire store to initial state
   */
  resetAuth(): void {
    this.reset(createInitialAuthState());
    this._token.set(null);
  }

  /**
   * Login with user data and token
   * @param user - User profile
   * @param token - Authentication token
   */
  login(user: UserProfileViewModel, token: string): void {
    this.setData(user);
    this.setAuthToken(token);
  }

  /**
   * Logout and clear all auth data
   */
  logout(): void {
    this.clearUser();
  }
}
