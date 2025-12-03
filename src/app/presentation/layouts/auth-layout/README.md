# AuthLayout Component

## نظرة عامة

مكون تخطيط بسيط ومركز مخصص لصفحات المصادقة (تسجيل الدخول، التسجيل، استعادة كلمة المرور).

## الميزات

- ✅ تصميم بسيط ومركز للنماذج
- ✅ خلفية متدرجة جذابة مع أشكال زخرفية
- ✅ دعم الوضع الداكن (Dark Mode)
- ✅ تصميم متجاوب (Responsive)
- ✅ رسوم متحركة سلسة (Fade-in animation)
- ✅ دعم RTL للغة العربية
- ✅ استخدام `router-outlet` لعرض المحتوى الديناميكي

## الاستخدام

### في ملف المسارات (Routes)

```typescript
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './presentation/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/pages/register/register.component')
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/pages/forgot-password/forgot-password.component')
      }
    ]
  }
];
```

### مثال على صفحة تسجيل الدخول

```typescript
// login.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-form">
      <h2>تسجيل الدخول</h2>
      <p class="text-muted">أدخل بياناتك للوصول إلى حسابك</p>
      
      <form>
        <!-- Form fields here -->
      </form>
    </div>
  `
})
export class LoginComponent {}
```

## الهيكل

```
auth-layout/
├── auth-layout.component.ts       # منطق المكون
├── auth-layout.component.html     # قالب HTML
├── auth-layout.component.scss     # الأنماط
├── auth-layout.component.spec.ts  # الاختبارات
└── README.md                      # التوثيق
```

## التخصيص

### تغيير الألوان

يمكنك تخصيص ألوان الخلفية المتدرجة في ملف SCSS:

```scss
.auth-layout {
  background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-info) 100%);
}
```

### تغيير حجم الحاوية

```scss
.auth-container {
  max-width: 450px; // قم بتغيير هذه القيمة
}
```

### إضافة شعار مخصص

قم بتحديث مسار الصورة في القالب:

```html
<img src="/assets/your-logo.png" alt="Logo" class="logo-image" />
```

## المتطلبات المحققة

- ✅ **Requirement 7.1**: إنشاء تخطيط جديد في `presentation/layouts`
- ✅ **Requirement 7.2**: استخدام `<router-outlet>` لعرض المحتوى الديناميكي

## الاختبارات

تم تضمين اختبارات شاملة للمكون:

```bash
npm test -- auth-layout.component.spec.ts
```

## الملاحظات

- المكون مستقل (Standalone) ولا يحتاج إلى NgModule
- يدعم التصميم المتجاوب لجميع أحجام الشاشات
- يتضمن رسوم متحركة سلسة عند التحميل
- متوافق مع الوضع الداكن تلقائياً
