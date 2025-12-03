# دليل السمات (Theme Guide)

## 🎨 كيفية استخدام السمات

### 1. التبديل بين السمات

Bootstrap 5 يدعم السمات الفاتحة والداكنة بشكل أصلي باستخدام `data-bs-theme`.

#### في HTML:

```html
<!-- السمة الفاتحة (افتراضية) -->
<html data-bs-theme="light">

<!-- السمة الداكنة -->
<html data-bs-theme="dark">
```

### 2. إنشاء Theme Service

قم بإنشاء خدمة للتحكم في السمات:

```typescript
import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  
  // Signal للسمة الحالية
  currentTheme = signal<Theme>(this.getStoredTheme());

  constructor() {
    this.applyTheme(this.currentTheme());
    this.watchSystemTheme();
  }

  /**
   * تعيين السمة
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
    this.storeTheme(theme);
  }

  /**
   * التبديل بين الفاتحة والداكنة
   */
  toggleTheme(): void {
    const current = this.currentTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * تطبيق السمة على المستند
   */
  private applyTheme(theme: Theme): void {
    const effectiveTheme = this.getEffectiveTheme(theme);
    document.documentElement.setAttribute('data-bs-theme', effectiveTheme);
  }

  /**
   * الحصول على السمة الفعلية (مع مراعاة auto)
   */
  private getEffectiveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    }
    return theme;
  }

  /**
   * مراقبة تغييرات سمة النظام
   */
  private watchSystemTheme(): void {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (this.currentTheme() === 'auto') {
          this.applyTheme('auto');
        }
      });
  }

  /**
   * حفظ السمة في localStorage
   */
  private storeTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  /**
   * استرجاع السمة من localStorage
   */
  private getStoredTheme(): Theme {
    const stored = localStorage.getItem(this.THEME_KEY);
    return (stored as Theme) || 'auto';
  }
}
```

### 3. استخدام في المكونات

#### في Component:

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button 
      class="btn btn-outline-secondary"
      (click)="toggleTheme()">
      @if (themeService.currentTheme() === 'dark') {
        <i class="bi bi-sun"></i> وضع فاتح
      } @else {
        <i class="bi bi-moon"></i> وضع داكن
      }
    </button>
  `
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
```

#### مع قائمة اختيار:

```typescript
@Component({
  selector: 'app-theme-selector',
  template: `
    <div class="dropdown">
      <button 
        class="btn btn-outline-secondary dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown">
        السمة: {{ getCurrentThemeLabel() }}
      </button>
      <ul class="dropdown-menu">
        <li>
          <button 
            class="dropdown-item" 
            (click)="setTheme('light')"
            [class.active]="themeService.currentTheme() === 'light'">
            <i class="bi bi-sun"></i> فاتح
          </button>
        </li>
        <li>
          <button 
            class="dropdown-item" 
            (click)="setTheme('dark')"
            [class.active]="themeService.currentTheme() === 'dark'">
            <i class="bi bi-moon"></i> داكن
          </button>
        </li>
        <li>
          <button 
            class="dropdown-item" 
            (click)="setTheme('auto')"
            [class.active]="themeService.currentTheme() === 'auto'">
            <i class="bi bi-circle-half"></i> تلقائي
          </button>
        </li>
      </ul>
    </div>
  `
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  getCurrentThemeLabel(): string {
    const theme = this.themeService.currentTheme();
    return theme === 'light' ? 'فاتح' : theme === 'dark' ? 'داكن' : 'تلقائي';
  }
}
```

### 4. استخدام متغيرات CSS في الأنماط

Bootstrap يوفر متغيرات CSS تتغير تلقائياً مع السمة:

```scss
.my-component {
  // ألوان تتكيف مع السمة
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color);
  
  .card {
    background-color: var(--bs-card-bg);
    border-color: var(--bs-card-border-color);
  }
  
  .btn-custom {
    background-color: var(--bs-primary);
    color: var(--bs-primary-text);
    
    &:hover {
      background-color: var(--bs-primary-hover);
    }
  }
}
```

### 5. متغيرات Bootstrap المتاحة

```css
/* Colors */
--bs-primary
--bs-secondary
--bs-success
--bs-danger
--bs-warning
--bs-info
--bs-light
--bs-dark

/* Body */
--bs-body-bg
--bs-body-color
--bs-body-bg-rgb
--bs-body-color-rgb

/* Text */
--bs-heading-color
--bs-link-color
--bs-link-hover-color

/* Borders */
--bs-border-color
--bs-border-color-translucent

/* Components */
--bs-card-bg
--bs-card-border-color
--bs-modal-bg
--bs-dropdown-bg
--bs-navbar-bg
```

### 6. أنماط مخصصة للسمات

إذا كنت بحاجة لأنماط مخصصة لكل سمة:

```scss
// في _custom.scss
[data-bs-theme='light'] {
  .my-custom-component {
    background: linear-gradient(to right, #e3f2fd, #bbdefb);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

[data-bs-theme='dark'] {
  .my-custom-component {
    background: linear-gradient(to right, #1a237e, #283593);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
}
```

### 7. اختبار السمات

تأكد من اختبار جميع المكونات في كلا السمتين:

```typescript
// في الاختبارات
describe('MyComponent with themes', () => {
  it('should render correctly in light theme', () => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    // اختبارات...
  });

  it('should render correctly in dark theme', () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    // اختبارات...
  });
});
```

### 8. أفضل الممارسات

1. **استخدم متغيرات CSS**: بدلاً من الألوان الثابتة
2. **اختبر في كلا السمتين**: تأكد من قابلية القراءة والتباين
3. **احفظ تفضيلات المستخدم**: في localStorage
4. **راعِ سمة النظام**: استخدم `prefers-color-scheme`
5. **تجنب الألوان الثابتة**: استخدم متغيرات Bootstrap
6. **اختبر التباين**: تأكد من إمكانية الوصول (Accessibility)

### 9. Bootstrap Icons (اختياري)

لإضافة أيقونات Bootstrap:

```bash
npm install bootstrap-icons
```

في `styles.scss`:

```scss
@import 'bootstrap-icons/font/bootstrap-icons.css';
```

استخدام:

```html
<i class="bi bi-sun"></i>
<i class="bi bi-moon"></i>
<i class="bi bi-circle-half"></i>
```

### 10. موارد إضافية

- [Bootstrap Themes Documentation](https://getbootstrap.com/docs/5.3/customize/color-modes/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
