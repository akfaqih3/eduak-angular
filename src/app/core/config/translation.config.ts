import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

/**
 * Custom TranslateLoader implementation
 */
export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix: string = '/assets/i18n/',
    private suffix: string = '.json'
  ) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}

/**
 * Factory function to create TranslateLoader
 * @param http HttpClient instance
 * @returns TranslateLoader instance
 */
export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new CustomTranslateLoader(http, '/assets/i18n/', '.json');
}

/**
 * Supported languages configuration
 */
export const SUPPORTED_LANGUAGES = ['ar', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Default language
 */
export const DEFAULT_LANGUAGE: SupportedLanguage = 'ar';

/**
 * Language storage key in localStorage
 */
export const LANGUAGE_STORAGE_KEY = 'app_language';

/**
 * Language configuration for display
 */
export const LANGUAGE_CONFIG: Record<
  SupportedLanguage,
  { name: string; nativeName: string; dir: 'ltr' | 'rtl' }
> = {
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
  },
};
