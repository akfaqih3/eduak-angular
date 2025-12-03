# البداية السريعة - Bootstrap

## ✅ ما تم إنجازه

تم تثبيت وإعداد Bootstrap 5 بنجاح مع:
- ✅ Bootstrap 5.3
- ✅ Popper.js (للـ dropdowns و tooltips)
- ✅ دعم السمات (Light/Dark)
- ✅ دعم RTL
- ✅ متغيرات مخصصة
- ✅ أنماط إضافية

## 📁 الملفات

```
styles/
├── _variables.scss      # متغيرات Bootstrap المخصصة
├── _custom.scss         # أنماط مخصصة إضافية
├── bootstrap.scss       # نقطة الدخول الرئيسية
├── README.md            # دليل شامل
├── THEME_GUIDE.md       # دليل السمات
└── QUICK_START.md       # هذا الملف
```

## 🚀 الاستخدام السريع

### 1. في القوالب (HTML)

```html
<!-- Buttons -->
<button class="btn btn-primary">زر أساسي</button>
<button class="btn btn-outline-secondary">زر ثانوي</button>

<!-- Cards -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">عنوان</h5>
    <p class="card-text">محتوى</p>
  </div>
</div>

<!-- Grid -->
<div class="container">
  <div class="row">
    <div class="col-md-6">عمود 1</div>
    <div class="col-md-6">عمود 2</div>
  </div>
</div>

<!-- Spacing -->
<div class="p-4 m-2">محتوى</div>

<!-- Colors -->
<p class="text-primary">نص أزرق</p>
<div class="bg-success text-white p-3">خلفية خضراء</div>
```

### 2. تبديل السمات

```typescript
// في أي component
export class MyComponent {
  toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-bs-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', newTheme);
  }
}
```

```html
<button class="btn btn-outline-secondary" (click)="toggleTheme()">
  تبديل السمة
</button>
```

### 3. في ملفات SCSS

```scss
.my-component {
  // استخدام متغيرات CSS (تتكيف مع السمة)
  background-color: var(--bs-body-bg);
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color);
  
  // استخدام utility classes
  @extend .p-4;
  @extend .rounded;
  @extend .shadow;
}
```

## 🎨 الألوان المتاحة

```html
<!-- Text Colors -->
<p class="text-primary">أزرق</p>
<p class="text-secondary">رمادي</p>
<p class="text-success">أخضر</p>
<p class="text-danger">أحمر</p>
<p class="text-warning">برتقالي</p>
<p class="text-info">أزرق فاتح</p>

<!-- Background Colors -->
<div class="bg-primary text-white">خلفية زرقاء</div>
<div class="bg-success text-white">خلفية خضراء</div>
```

## 📱 Responsive

```html
<!-- مخفي على الشاشات الصغيرة -->
<div class="d-none d-md-block">محتوى</div>

<!-- عرض كامل على الموبايل، نصف على التابلت -->
<div class="col-12 col-md-6">محتوى</div>

<!-- Spacing responsive -->
<div class="p-2 p-md-4">محتوى</div>
```

## 🔗 روابط مفيدة

- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

## 📚 الخطوات التالية

1. اقرأ `README.md` للحصول على دليل شامل
2. اقرأ `THEME_GUIDE.md` لإنشاء نظام السمات
3. استكشف [Bootstrap Components](https://getbootstrap.com/docs/5.3/components/)
4. جرب [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)

## 💡 نصائح سريعة

1. استخدم `var(--bs-*)` للألوان التي تتكيف مع السمة
2. استخدم utility classes بدلاً من CSS مخصص
3. اختبر في كلا السمتين (Light/Dark)
4. استخدم نظام Grid للتخطيط responsive
5. راجع [Cheat Sheet](https://getbootstrap.com/docs/5.3/examples/cheatsheet/)
