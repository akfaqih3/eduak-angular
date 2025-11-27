# Constants & Configuration

هذا المجلد يحتوي على جميع الثوابت والإعدادات المركزية للتطبيق.

## 📁 الملفات

### `api-endpoints.ts`
يحتوي على جميع نقاط النهاية (Endpoints) للـ API.

**الاستخدام:**
```typescript
import { API_ENDPOINTS } from '@core/constants';

// استخدام endpoint ثابت
this.http.get(API_ENDPOINTS.COURSE.BASE);

// استخدام endpoint مع معامل
this.http.get(API_ENDPOINTS.COURSE.BY_ID(123));
```

### `app-constants.ts`
يحتوي على جميع الثوابت المستخدمة في التطبيق.

**الأقسام:**
- `STORAGE_KEYS` - مفاتيح التخزين المحلي
- `HTTP_HEADERS` - رؤوس HTTP
- `TOKEN_CONFIG` - إعدادات الـ Token
- `PAGINATION` - إعدادات الترقيم
- `VALIDATION` - قواعد التحقق
- `DATE_FORMATS` - تنسيقات التاريخ
- `HTTP_STATUS` - أكواد حالة HTTP
- `TIMEOUT` - مهلات الطلبات
- `ROUTES` - مسارات التطبيق
- `ERROR_MESSAGES` - رسائل الأخطاء (عربي)
- `SUCCESS_MESSAGES` - رسائل النجاح (عربي)
- `LANGUAGES` - اللغات المدعومة
- `THEMES` - السمات المدعومة
- `USER_ROLES` - أدوار المستخدمين
- `COURSE_STATUS` - حالات الدورات
- `FILE_UPLOAD` - إعدادات رفع الملفات

**الاستخدام:**
```typescript
import { STORAGE_KEYS, ERROR_MESSAGES, VALIDATION } from '@core/constants';

// استخدام مفاتيح التخزين
localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);

// استخدام رسائل الأخطاء
this.errorMessage = ERROR_MESSAGES.INVALID_EMAIL;

// استخدام قواعد التحقق
if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
  // ...
}
```

### `environment.ts`
إعدادات البيئة والـ API URL.

**الاستخدام:**
```typescript
import { getEnvironment, buildApiUrl } from '@core/constants';

const env = getEnvironment();
console.log(env.apiUrl); // http://localhost:3000

const fullUrl = buildApiUrl('/courses');
// http://localhost:3000/api/v1/courses
```

## 🎯 المميزات

### 1. **مركزية الإدارة**
جميع الثوابت في مكان واحد، سهل التعديل والصيانة.

### 2. **Type Safety**
استخدام `as const` لضمان الـ Type Safety.

### 3. **سهولة الاستخدام**
أسماء واضحة ومنظمة.

### 4. **قابلية الصيانة**
تغيير قيمة واحدة يؤثر على كل التطبيق.

### 5. **دعم اللغة العربية**
رسائل الأخطاء والنجاح بالعربية.

## 📝 أمثلة الاستخدام

### مثال 1: استخدام API Endpoints
```typescript
@Injectable({ providedIn: 'root' })
export class CourseDataSource {
  private http = inject(HttpClient);

  getCourses() {
    return this.http.get(API_ENDPOINTS.COURSE.BASE);
  }

  getCourse(id: number) {
    return this.http.get(API_ENDPOINTS.COURSE.BY_ID(id));
  }
}
```

### مثال 2: استخدام Validation
```typescript
validateEmail(email: string): boolean {
  if (!ValidationUtils.isValidEmail(email)) {
    this.error = ERROR_MESSAGES.INVALID_EMAIL;
    return false;
  }
  return true;
}
```

### مثال 3: استخدام Storage
```typescript
login(token: string, userData: any) {
  StorageUtils.setAccessToken(token);
  StorageUtils.setUserData(userData);
}

logout() {
  StorageUtils.clearAuthData();
}
```

## 🔧 إضافة ثوابت جديدة

### إضافة Endpoint جديد:
```typescript
// في api-endpoints.ts
export const API_ENDPOINTS = {
  // ... existing endpoints
  
  NEW_MODULE: {
    BASE: `${API_BASE_URL}/new-module`,
    BY_ID: (id: number) => `${API_BASE_URL}/new-module/${id}`,
  },
} as const;
```

### إضافة رسالة خطأ جديدة:
```typescript
// في app-constants.ts
export const ERROR_MESSAGES = {
  // ... existing messages
  
  NEW_ERROR: 'رسالة الخطأ الجديدة',
} as const;
```

## ⚠️ ملاحظات مهمة

1. **لا تستخدم strings مباشرة** - استخدم الثوابت دائماً
2. **استخدم `as const`** - للحفاظ على Type Safety
3. **اتبع التسمية الموحدة** - UPPER_SNAKE_CASE للثوابت
4. **وثق التغييرات** - أضف تعليقات للثوابت الجديدة

## 🚀 Best Practices

1. ✅ استخدم الثوابت بدلاً من القيم المباشرة
2. ✅ استخدم الـ Utils بدلاً من تكرار الكود
3. ✅ استخدم رسائل الأخطاء المعرفة مسبقاً
4. ✅ استخدم الـ Type Safety
5. ❌ لا تستخدم magic numbers أو strings
6. ❌ لا تكرر الثوابت في أماكن متعددة
