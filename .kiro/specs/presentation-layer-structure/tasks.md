# خطة تنفيذ هيكل طبقة العرض

- [x] 1. إنشاء الهيكل الأساسي لطبقة Presentation





  - إنشاء المجلدات الرئيسية: features, shared, layouts, guards, interceptors, directives, pipes, styles
  - إنشاء ملفات index.ts لكل مجلد لتسهيل الاستيراد
  - _Requirements: 1.1, 2.1_

- [x] 2. إعداد نظام الأنماط (Styles System)






  - [x] 2.1 إنشاء هيكل مجلد الأنماط

    - إنشاء المجلدات: abstracts, base, themes
    - إنشاء ملفات: _variables.scss, _mixins.scss, _functions.scss
    - _Requirements: 8.1, 8.3_
  
  - [x] 2.2 تعريف المتغيرات والألوان


    - تعريف متغيرات الألوان الأساسية
    - تعريف متغيرات الخطوط والمسافات
    - تعريف متغيرات Breakpoints للاستجابة
    - _Requirements: 8.3_
  

  - [x] 2.3 إنشاء السمات (Light/Dark Themes)

    - إنشاء ملف _light.scss للسمة الفاتحة
    - إنشاء ملف _dark.scss للسمة الداكنة
    - ربط السمات بمتغيرات CSS
    - _Requirements: 8.1_

- [x] 3. بناء المكونات المشتركة الأساسية (Shared Components)




  - [x] 3.1 إنشاء مكونات UI الأساسية


    - إنشاء Button Component مع أنماط مختلفة (primary, secondary, danger)
    - إنشاء Input Component مع دعم الأخطاء والتحقق
    - إنشاء Card Component للعرض المنظم
    - _Requirements: 2.1, 2.3_
  
  - [x] 3.2 إنشاء مكونات التغذية الراجعة


    - إنشاء LoadingSpinner Component لحالات التحميل
    - إنشاء ErrorMessage Component لعرض الأخطاء
    - إنشاء Toast/Notification Component للإشعارات
    - _Requirements: 9.1, 9.2_
  
  - [x] 3.3 إنشاء مكونات التنقل


    - إنشاء Navbar Component للشريط العلوي
    - إنشاء Sidebar Component للقائمة الجانبية
    - إنشاء Breadcrumb Component لمسار التنقل
    - _Requirements: 2.1_

- [x] 4. إنشاء التخطيطات (Layouts)







  - [x] 4.1 إنشاء MainLayout







    - إنشاء MainLayoutComponent مع Navbar و Sidebar
    - إضافة router-outlet لعرض المحتوى الديناميكي
    - تطبيق الأنماط المناسبة
    - _Requirements: 7.1, 7.2_
  
  - [x] 4.2 إنشاء AuthLayout





    - إنشاء AuthLayoutComponent لصفحات المصادقة
    - تصميم بسيط ومركز للنماذج
    - _Requirements: 7.1, 7.2_

- [ ] 5. إعداد نظام إدارة الحالة (State Management)
  - [x] 5.1 إنشاء Store Pattern الأساسي





    - إنشاء BaseStore class مع Signals
    - تعريف الواجهات الأساسية للحالة (loading, error, data)
    - _Requirements: 3.1, 3.2_
  
  - [x] 5.2 إنشاء مثال AuthStore






    - إنشاء AuthStore مع signals للمستخدم والحالة
    - إضافة computed signals (isAuthenticated, userRole)
    - إضافة methods لتحديث الحالة
    - _Requirements: 3.1, 3.2, 3.3_

- [ ] 6. إنشاء Facade Pattern للميزات
  - [ ] 6.1 إنشاء BaseFacade
    - إنشاء BaseFacade class مع الوظائف المشتركة
    - ربط Facade مع Use Cases من طبقة Domain
    - _Requirements: 4.1, 4.2_
  
  - [ ] 6.2 إنشاء مثال AuthFacade
    - إنشاء AuthFacade للتعامل مع عمليات المصادقة
    - ربط AuthFacade مع AuthStore و Use Cases
    - توفير methods بسيطة للمكونات (login, logout, register)
    - _Requirements: 4.1, 4.2_

- [ ] 7. إنشاء Guards للمسارات
  - [ ] 7.1 إنشاء AuthGuard
    - إنشاء AuthGuard للتحقق من المصادقة
    - إعادة التوجيه لصفحة Login عند عدم المصادقة
    - _Requirements: 5.1_
  
  - [ ] 7.2 إنشاء RoleGuard
    - إنشاء RoleGuard للتحقق من الصلاحيات
    - منع الوصول للصفحات حسب الدور
    - _Requirements: 5.1_

- [ ] 8. إنشاء Interceptors
  - [ ] 8.1 إنشاء AuthInterceptor
    - إضافة Token تلقائياً لجميع الطلبات
    - معالجة حالات انتهاء صلاحية Token
    - _Requirements: 4.2_
  
  - [ ] 8.2 إنشاء ErrorInterceptor
    - معالجة الأخطاء المركزية من API
    - عرض رسائل خطأ واضحة للمستخدم
    - _Requirements: 9.1_
  
  - [ ] 8.3 إنشاء LoadingInterceptor
    - إدارة حالة التحميل العامة
    - عرض/إخفاء مؤشر التحميل تلقائياً
    - _Requirements: 9.2_

- [ ] 9. إنشاء Directives المخصصة
  - إنشاء ClickOutsideDirective للتعامل مع النقر خارج العنصر
  - إنشاء PermissionDirective لإخفاء/إظهار العناصر حسب الصلاحيات
  - إنشاء LazyLoadDirective لتحميل الصور بشكل كسول
  - _Requirements: 2.1_

- [ ] 10. إنشاء Pipes المخصصة
  - إنشاء DateFormatPipe لتنسيق التواريخ
  - إنشاء CurrencyFormatPipe لتنسيق العملات
  - إنشاء TruncatePipe لاختصار النصوص الطويلة
  - _Requirements: 2.1_

- [ ] 11. إنشاء ميزة المصادقة كمثال (Auth Feature)
  - [ ] 11.1 إنشاء هيكل ميزة Auth
    - إنشاء المجلدات: pages, components, services, models, forms
    - إنشاء auth.routes.ts للمسارات
    - _Requirements: 1.1, 1.2, 5.1_
  
  - [ ] 11.2 إنشاء ViewModels
    - إنشاء LoginViewModel
    - إنشاء RegisterViewModel
    - إنشاء UserProfileViewModel
    - إنشاء Mapper functions من Domain Entities
    - _Requirements: _
  
  - [ ] 11.3 إنشاء صفحة Login
    - إنشاء LoginComponent (Smart Component)
    - ربط المكون مع AuthFacade
    - معالجة حالات النجاح والفشل
    - _Requirements: 4.1, 4.2, 5.2_
  
  - [ ] 11.4 إنشاء نموذج Login
    - إنشاء LoginFormComponent (Presentational)
    - استخدام Reactive Forms مع التحقق
    - عرض رسائل الأخطاء
    - _Requirements: 6.1, 6.2_
  
  - [ ] 11.5 إنشاء صفحة Register
    - إنشاء RegisterComponent
    - إنشاء RegisterFormComponent
    - ربط مع AuthFacade
    - _Requirements: 4.1, 4.2, 6.1_

- [ ] 12. إعداد نظام المسارات (Routing)
  - [ ] 12.1 تكوين المسارات الرئيسية
    - تحديث app.routes.ts مع التخطيطات
    - إضافة مسارات Lazy Loading للميزات
    - إضافة صفحة NotFound
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ] 12.2 تطبيق Guards على المسارات
    - إضافة AuthGuard للمسارات المحمية
    - إضافة RoleGuard للمسارات الإدارية
    - _Requirements: 5.1_

- [ ] 13. إعداد نظام الخدمات المشتركة
  - [ ] 13.1 إنشاء ThemeService
    - إدارة السمة الحالية (Light/Dark)
    - حفظ التفضيلات في LocalStorage
    - تطبيق السمة على التطبيق
    - _Requirements: 8.1_
  
  - [ ] 13.2 إنشاء NotificationService
    - عرض إشعارات Toast
    - دعم أنواع مختلفة (success, error, warning, info)
    - إدارة قائمة الإشعارات
    - _Requirements: 9.1_
  
  - [ ] 13.3 إنشاء DialogService
    - فتح نوافذ حوارية (Modals)
    - دعم التأكيد والإلغاء
    - إرجاع نتيجة الحوار
    - _Requirements: 2.1_

- [ ] 14. إعداد نظام التدويل (i18n)
  - [ ] 14.1 تكوين مكتبة الترجمة
    - تثبيت وتكوين مكتبة الترجمة (مثل @ngx-translate)
    - إنشاء ملفات الترجمة (ar.json, en.json)
    - _Requirements: 10.1, 10.3_
  
  - [ ] 14.2 إنشاء LanguageService
    - إدارة اللغة الحالية
    - تبديل اللغات ديناميكياً
    - حفظ التفضيلات
    - _Requirements: 10.2_
  
  - [ ] 14.3 تطبيق الترجمة على المكونات
    - استخدام translate pipe في القوالب
    - ترجمة النصوص في المكونات المشتركة
    - _Requirements: 10.1, 10.2_

- [ ] 15. إنشاء مثال ميزة إدارة المستخدمين (Users Feature)
  - [ ] 15.1 إنشاء هيكل ميزة Users
    - إنشاء المجلدات والملفات الأساسية
    - إنشاء users.routes.ts
    - _Requirements: 1.1, 1.2_
  
  - [ ] 15.2 إنشاء UserStore و UserFacade
    - إنشاء UserStore لإدارة حالة المستخدمين
    - إنشاء UserFacade للتفاعل مع Use Cases
    - _Requirements: 3.1, 3.2, 4.1, 4.2_
  
  - [ ] 15.3 إنشاء صفحة قائمة المستخدمين
    - إنشاء UserListPageComponent (Smart)
    - إنشاء UserListComponent (Presentational)
    - إنشاء UserCardComponent لعرض بطاقة المستخدم
    - _Requirements: 4.1, 4.2_
  
  - [ ] 15.4 إنشاء صفحة تفاصيل المستخدم
    - إنشاء UserDetailPageComponent
    - إنشاء UserProfileComponent
    - عرض معلومات المستخدم بشكل منظم
    - _Requirements: 4.1, 4.2_

- [ ] 16. تحسينات الأداء
  - [ ] 16.1 تطبيق OnPush Change Detection
    - تطبيق OnPush على المكونات Presentational
    - التأكد من استخدام Signals بشكل صحيح
    - _Requirements: 3.3_
  
  - [ ] 16.2 تطبيق TrackBy Functions
    - إضافة trackBy للقوائم الديناميكية
    - تحسين أداء العرض
    - _Requirements: 3.3_

- [ ] 17. التوثيق والأمثلة
  - إنشاء ملف README.md في مجلد presentation
  - توثيق الهيكل والأنماط المستخدمة
  - إضافة أمثلة على كيفية إنشاء ميزة جديدة
  - _Requirements: جميع المتطلبات_
