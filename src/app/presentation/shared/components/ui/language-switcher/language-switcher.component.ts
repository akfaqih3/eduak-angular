import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

/**
 * Language Switcher Component
 * Provides UI for switching between supported languages
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);

  /**
   * Toggle between languages
   */
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  /**
   * Get current language display name
   */
  getCurrentLanguageName(): string {
    return this.languageService.getLanguageName(
      this.languageService.currentLanguage(),
      true
    );
  }
}
