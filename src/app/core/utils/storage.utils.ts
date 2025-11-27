import { STORAGE_KEYS } from '../constants';

/**
 * Storage Utilities
 * Helper functions for localStorage operations
 */

export class StorageUtils {
  /**
   * Save access token
   */
  static setAccessToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  /**
   * Get access token
   */
  static getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Remove access token
   */
  static removeAccessToken(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Save refresh token
   */
  static setRefreshToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  /**
   * Get refresh token
   */
  static getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Remove refresh token
   */
  static removeRefreshToken(): void {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Save user data
   */
  static setUserData(data: any): void {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
  }

  /**
   * Get user data
   */
  static getUserData<T>(): T | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Remove user data
   */
  static removeUserData(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Clear all auth data
   */
  static clearAuthData(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeUserData();
  }

  /**
   * Save language preference
   */
  static setLanguage(language: string): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  /**
   * Get language preference
   */
  static getLanguage(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  }

  /**
   * Save theme preference
   */
  static setTheme(theme: string): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  /**
   * Get theme preference
   */
  static getTheme(): string | null {
    return localStorage.getItem(STORAGE_KEYS.THEME);
  }

  /**
   * Clear all storage
   */
  static clearAll(): void {
    localStorage.clear();
  }
}
