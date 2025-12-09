# نظام التدويل (i18n)

## نظرة عامة

تم إعداد نظام التدويل باستخدام `@ngx-translate/core` لدعم اللغتين العربية والإنجليزية مع إمكانية التبديل الديناميكي بينهما.

تم استخدام Custom TranslateLoader بدلاً من `@ngx-translate/http-loader` لتوافق أفضل مع Angular 21.

## المكونات الرئيسية

### 1. ملفات الترجمة
- `src/assets/i18n/ar.json` - الترجمات العربية
- `src/assets/i18n/en.json` - الترجمات الإنجليزية

### 2. التكوين
- `src/app/core/config/translation.config.ts` - إعدادات نظام الترجمة
  - اللغات المدعومة: `['ar', 'en']`
  - اللغة الافتراضية: `ar`
  - اتجاه النص: RTL للعربية، LTR للإنجليزية

### 3. الخدمات
- `LanguageService` - خدمة إدارة اللغات
  - `setLanguage(lang)` - تعيين اللغة الحالية
  - `toggleLanguage()` - التبديل بين العربية والإنجليزية
  - `translate(key, params?)` - ترجمة مفتاح معين
  - `currentLanguage` - signal للغة الحالية
  - `isRTL` - signal لاتجاه النص

### 4. المكونات
- `LanguageSwitcherComponent` - مكون تبديل اللغة

## الاستخدام

### في القوالب (Templates)

```html
<!-- استخدام translate pipe -->
<h1>{{ 'common.welcome' | translate }}</h1>

<!-- مع معاملات -->
<p>{{ 'validation.minLength' | translate: {min: 8} }}</p>

<!-- في الخصائص -->
<button [attr.aria-label]="'common.close' | translate">
  {{ 'common.close' | translate }}
</button>
```

### في المكونات (Components)

```typescript
import { Component, inject } from '@angular/core';
import { LanguageService } from './services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TranslateModule], // إضافة TranslateModule
  template: `
    <h1>{{ 'common.welcome' | translate }}</h1>
    <button (click)="changeLanguage()">
      {{ languageService.currentLanguage() === 'ar' ? 'English' : 'العربية' }}
    </button>
  `
})
export class ExampleComponent {
  protected languageService = inject(LanguageService);

  changeLanguage() {
    this.languageService.toggleLanguage();
  }

  // استخدام الترجمة في الكود
  getMessage() {
    return this.languageService.translate('common.success');
  }
}
```

### إضافة مكون تبديل اللغة

```typescript
import { LanguageSwitcherComponent } from './components/ui/language-switcher/language-switcher.component';

@Component({
  imports: [LanguageSwitcherComponent],
  template: `
    <app-language-switcher />
  `
})
```

## هيكل ملفات الترجمة

```json
{
  "common": {
    "welcome": "مرحباً",
    "loading": "جاري التحميل...",
    ...
  },
  "auth": {
    "login": {
      "title": "تسجيل الدخول",
      ...
    }
  },
  "navigation": { ... },
  "validation": { ... },
  "errors": { ... }
}
```

## إضافة ترجمات جديدة

1. أضف المفتاح في `src/assets/i18n/ar.json`
2. أضف الترجمة المقابلة في `src/assets/i18n/en.json`
3. استخدم المفتاح في القالب: `{{ 'category.key' | translate }}`

## الميزات

- ✅ تبديل ديناميكي بين اللغات
- ✅ حفظ تفضيلات اللغة في localStorage
- ✅ تحديث اتجاه النص (RTL/LTR) تلقائياً
- ✅ دعم المعاملات في الترجمات
- ✅ Signals للتفاعل مع تغييرات اللغة
- ✅ دعم SSR (Server-Side Rendering)

## ملاحظات

- يتم تحميل ملفات الترجمة بشكل lazy من مجلد assets
- اللغة الافتراضية هي العربية
- يتم حفظ اختيار المستخدم في localStorage
- يتم تحديث اتجاه document.dir تلقائياً عند تغيير اللغة
