import { Injectable, signal, effect } from '@angular/core';

/**
 * Theme types supported by the application
 */
export type Theme = 'light' | 'dark';

/**
 * ThemeService
 * Manages the application theme (Light/Dark mode)
 * - Persists theme preference in localStorage
 * - Applies theme to the application by updating document class
 * - Provides reactive theme state using signals
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'app-theme';
  private readonly THEME_CLASS_PREFIX = 'theme-';

  // Private writable signal
  private _currentTheme = signal<Theme>(this.getInitialTheme());

  // Public readonly signal
  readonly currentTheme = this._currentTheme.asReadonly();

  constructor() {
    // Apply theme whenever it changes
    effect(() => {
      this.applyTheme(this._currentTheme());
    });
  }

  /**
   * Get the initial theme from localStorage or system preference
   */
  private getInitialTheme(): Theme {
    // Try to get from localStorage first
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  /**
   * Set the current theme
   * @param theme - The theme to apply
   */
  setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
    this.saveThemePreference(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this._currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Check if dark mode is currently active
   */
  isDarkMode(): boolean {
    return this._currentTheme() === 'dark';
  }

  /**
   * Apply the theme to the document
   * @param theme - The theme to apply
   */
  private applyTheme(theme: Theme): void {
    const htmlElement = document.documentElement;
    
    // Remove all theme classes
    htmlElement.classList.remove(`${this.THEME_CLASS_PREFIX}light`, `${this.THEME_CLASS_PREFIX}dark`);
    
    // Add the new theme class
    htmlElement.classList.add(`${this.THEME_CLASS_PREFIX}${theme}`);
    
    // Also set a data attribute for CSS targeting
    htmlElement.setAttribute('data-theme', theme);
  }

  /**
   * Save theme preference to localStorage
   * @param theme - The theme to save
   */
  private saveThemePreference(theme: Theme): void {
    try {
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }

  /**
   * Clear saved theme preference
   */
  clearThemePreference(): void {
    try {
      localStorage.removeItem(this.THEME_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear theme preference:', error);
    }
  }
}
