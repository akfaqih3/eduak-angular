import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LANGUAGE_CONFIG,
  SupportedLanguage,
} from '../../../core/config/translation.config';

/**
 * Service for managing application language and translations
 * Handles language switching, persistence, and RTL/LTR direction
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Current language signal
  private readonly currentLanguageSignal = signal<SupportedLanguage>(DEFAULT_LANGUAGE);

  // Public readonly signals
  readonly currentLanguage = this.currentLanguageSignal.asReadonly();
  readonly currentDirection = computed(() => LANGUAGE_CONFIG[this.currentLanguage()].dir);
  readonly isRTL = computed(() => this.currentDirection() === 'rtl');
  readonly supportedLanguages = SUPPORTED_LANGUAGES;
  readonly languageConfig = LANGUAGE_CONFIG;

  constructor() {
    // Initialize translation service
    this.initializeTranslation();

    // Effect to update document direction when language changes
    if (this.isBrowser) {
      effect(() => {
        const direction = this.currentDirection();
        document.documentElement.dir = direction;
        document.documentElement.lang = this.currentLanguage();
      });
    }
  }

  /**
   * Initialize translation service with default settings
   */
  private initializeTranslation(): void {
    // Set available languages
    this.translateService.addLangs([...SUPPORTED_LANGUAGES]);

    // Set default language
    this.translateService.setDefaultLang(DEFAULT_LANGUAGE);

    // Load saved language or use default
    const savedLanguage = this.getSavedLanguage();
    this.setLanguage(savedLanguage);
  }

  /**
   * Get saved language from localStorage
   */
  private getSavedLanguage(): SupportedLanguage {
    if (!this.isBrowser) {
      return DEFAULT_LANGUAGE;
    }

    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && this.isValidLanguage(saved)) {
        return saved as SupportedLanguage;
      }
    } catch (error) {
      console.warn('Failed to load saved language:', error);
    }

    return DEFAULT_LANGUAGE;
  }

  /**
   * Save language to localStorage
   */
  private saveLanguage(language: SupportedLanguage): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.warn('Failed to save language:', error);
    }
  }

  /**
   * Check if language code is valid
   */
  private isValidLanguage(lang: string): lang is SupportedLanguage {
    return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
  }

  /**
   * Set current language
   * @param language Language code to set
   */
  setLanguage(language: SupportedLanguage): void {
    if (!this.isValidLanguage(language)) {
      console.warn(`Invalid language: ${language}. Using default.`);
      language = DEFAULT_LANGUAGE;
    }

    this.translateService.use(language);
    this.currentLanguageSignal.set(language);
    this.saveLanguage(language);
  }

  /**
   * Toggle between Arabic and English
   */
  toggleLanguage(): void {
    const current = this.currentLanguage();
    const newLanguage = current === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLanguage);
  }

  /**
   * Get translation for a key
   * @param key Translation key
   * @param params Optional parameters for interpolation
   */
  translate(key: string, params?: object): string {
    return this.translateService.instant(key, params);
  }

  /**
   * Get language display name
   * @param language Language code
   * @param native Whether to return native name
   */
  getLanguageName(language: SupportedLanguage, native = false): string {
    return native
      ? LANGUAGE_CONFIG[language].nativeName
      : LANGUAGE_CONFIG[language].name;
  }
}
