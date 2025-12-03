# نظام الأنماط - Bootstrap

نظام الأنماط المعتمد على Bootstrap 5 مع دعم السمات المتعددة (Light/Dark) والتخصيصات.

## 📁 هيكل الملفات

```
styles/
├── _variables.scss    # متغيرات Bootstrap المخصصة
├── _custom.scss       # أنماط مخصصة إضافية
├── bootstrap.scss     # نقطة الدخول الرئيسية
└── README.md          # هذا الملف
```

## 🎨 التخصيصات المتاحة

### الألوان

تم تخصيص ألوان Bootstrap الافتراضية:

```scss
$primary: #2196f3;    // الأزرق
$secondary: #6c757d;  // الرمادي
$success: #4caf50;    // الأخضر
$info: #03a9f4;       // الأزرق الفاتح
$warning: #ff9800;    // البرتقالي
$danger: #f44336;     // الأحمر
```

### الخطوط

```scss
$font-family-base: 'Cairo', 'Segoe UI', sans-serif;
```

### المسافات

تم توسيع نظام المسافات ليشمل قيم إضافية (0-8).

## 🎭 السمات (Themes)

### تفعيل السمة الداكنة

Bootstrap 5 يدعم السمات بشكل أصلي. لتفعيل السمة الداكنة:

```html
<!-- في HTML -->
<html data-bs-theme="dark">
  <!-- Your app -->
</html>
```

```typescript
// في TypeScript/Angular
export class ThemeService {
  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
  
  toggleTheme() {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}
```

## 🚀 الاستخدام

### في القوالب (Templates)

استخدم classes Bootstrap مباشرة:

```html
<!-- Buttons -->
<button class="btn btn-primary">زر أساسي</button>
<button class="btn btn-secondary">زر ثانوي</button>

<!-- Cards -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">عنوان البطاقة</h5>
    <p class="card-text">محتوى البطاقة</p>
  </div>
</div>

<!-- Grid System -->
<div class="container">
  <div class="row">
    <div class="col-md-6">عمود 1</div>
    <div class="col-md-6">عمود 2</div>
  </div>
</div>

<!-- Spacing Utilities -->
<div class="p-4 m-2">محتوى مع padding و margin</div>

<!-- Typography -->
<h1 class="display-1">عنوان كبير</h1>
<p class="lead">فقرة بارزة</p>
<p class="text-muted">نص باهت</p>
```

### في ملفات SCSS

```scss
// استيراد متغيرات Bootstrap
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

.my-component {
  // استخدام متغيرات Bootstrap
  color: $primary;
  padding: $spacer;
  
  // استخدام mixins
  @include media-breakpoint-up(md) {
    padding: $spacer * 2;
  }
}
```

### استخدام CSS Variables

Bootstrap يوفر CSS variables للسمات:

```scss
.my-component {
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color);
}
```

## 🛠️ المكونات المتاحة

Bootstrap يوفر مكونات جاهزة:

- **Layout**: Container, Grid, Columns
- **Content**: Typography, Images, Tables, Figures
- **Forms**: Form controls, Select, Checks, Range, Input group
- **Components**: 
  - Accordion
  - Alerts
  - Badge
  - Breadcrumb
  - Buttons
  - Button group
  - Card
  - Carousel
  - Close button
  - Collapse
  - Dropdowns
  - List group
  - Modal
  - Navs & tabs
  - Navbar
  - Offcanvas
  - Pagination
  - Placeholders
  - Popovers
  - Progress
  - Scrollspy
  - Spinners
  - Toasts
  - Tooltips

## 📱 Responsive Design

Bootstrap يستخدم نظام breakpoints:

```scss
// Breakpoints
xs: 0px      // Extra small (phones)
sm: 576px    // Small (phones landscape)
md: 768px    // Medium (tablets)
lg: 992px    // Large (desktops)
xl: 1200px   // Extra large (large desktops)
xxl: 1400px  // Extra extra large (larger desktops)
```

استخدام في HTML:

```html
<div class="col-12 col-md-6 col-lg-4">
  <!-- Full width on mobile, half on tablet, third on desktop -->
</div>
```

## 🎨 Utility Classes

Bootstrap يوفر utility classes شاملة:

```html
<!-- Spacing -->
<div class="p-3 m-2">padding: 1rem, margin: 0.5rem</div>
<div class="mt-4 mb-3">margin-top: 1.5rem, margin-bottom: 1rem</div>

<!-- Colors -->
<p class="text-primary">نص أزرق</p>
<div class="bg-success">خلفية خضراء</div>

<!-- Display -->
<div class="d-flex justify-content-between align-items-center">
  Flexbox utilities
</div>

<!-- Sizing -->
<div class="w-100 h-50">width: 100%, height: 50%</div>

<!-- Text -->
<p class="text-center fw-bold">نص في المنتصف وعريض</p>
```

## 🌐 دعم RTL

Bootstrap يدعم RTL بشكل أصلي. تم تفعيله في المتغيرات:

```scss
$enable-rtl: true;
```

لتفعيل RTL في التطبيق:

```html
<html dir="rtl" lang="ar">
  <!-- Your app -->
</html>
```

## 🎯 أنماط مخصصة إضافية

تم إضافة بعض الأنماط المخصصة في `_custom.scss`:

```html
<!-- Transitions -->
<div class="transition-all">انتقال سلس</div>
<div class="transition-fast">انتقال سريع</div>

<!-- Custom Scrollbar -->
<div class="custom-scrollbar">محتوى مع scrollbar مخصص</div>

<!-- Animations -->
<div class="fade-in">ظهور تدريجي</div>
<div class="slide-in-top">انزلاق من الأعلى</div>

<!-- Elevated Card -->
<div class="card card-elevated">بطاقة مرتفعة</div>
```

## 📚 موارد إضافية

- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Bootstrap Themes](https://themes.getbootstrap.com/)

## 💡 نصائح

1. **استخدم utility classes**: بدلاً من كتابة CSS مخصص، استخدم utility classes المتاحة
2. **اتبع نظام Grid**: استخدم نظام Grid للتخطيط responsive
3. **استخدم المكونات الجاهزة**: لا تعيد اختراع العجلة
4. **خصص المتغيرات**: عدل `_variables.scss` لتخصيص المظهر
5. **اختبر في كلا السمتين**: تأكد من أن التطبيق يعمل في Light و Dark mode
6. **استخدم RTL**: تأكد من أن التطبيق يعمل بشكل صحيح في الاتجاه من اليمين لليسار

## 🔄 تحديث Bootstrap

لتحديث Bootstrap لأحدث إصدار:

```bash
npm update bootstrap @popperjs/core
```
