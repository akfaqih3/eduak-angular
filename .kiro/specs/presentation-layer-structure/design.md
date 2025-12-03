# تصميم هيكل طبقة العرض (Presentation Layer Design)

## نظرة عامة

تصميم طبقة العرض في Angular وفق المعمارية النظيفة يهدف إلى فصل واضح بين مسؤوليات العرض ومنطق الأعمال. سنستخدم أحدث ميزات Angular 21 مثل Signals و Standalone Components لبناء هيكل مرن وقابل للصيانة.

## المعمارية العامة

### هيكل المجلدات الرئيسي

```
src/app/
├── core/                    # الوظائف الأساسية المشتركة
├── domain/                  # منطق الأعمال والكيانات
├── data/                    # مصادر البيانات والمستودعات
└── presentation/            # طبقة العرض (UI Layer)
    ├── features/            # الميزات الوظيفية
    ├── shared/              # المكونات والخدمات المشتركة
    ├── layouts/             # التخطيطات الرئيسية
    ├── guards/              # حراس المسارات
    ├── interceptors/        # معترضات HTTP
    ├── directives/          # التوجيهات المخصصة
    ├── pipes/               # الأنابيب المخصصة
    └── styles/              # الأنماط العامة
```

## المكونات الرئيسية

### 1. Features (الميزات)

كل ميزة وظيفية لها هيكل موحد:

```
presentation/features/{feature-name}/
├── pages/                   # صفحات الميزة
│   ├── {page-name}/
│   │   ├── {page-name}.component.ts
│   │   ├── {page-name}.component.html
│   │   ├── {page-name}.component.scss
│   │   └── {page-name}.component.spec.ts
│   └── index.ts
├── components/              # مكونات خاصة بالميزة
│   ├── {component-name}/
│   │   ├── {component-name}.component.ts
│   │   ├── {component-name}.component.html
│   │   ├── {component-name}.component.scss
│   │   └── {component-name}.component.spec.ts
│   └── index.ts
├── services/                # خدمات خاصة بالميزة
│   ├── {feature}.store.ts   # إدارة الحالة باستخدام Signals
│   ├── {feature}.facade.ts  # واجهة موحدة للتفاعل مع Use Cases
│   └── index.ts
├── models/                  # ViewModels و DTOs للعرض
│   ├── {model}.view-model.ts
│   └── index.ts
├── forms/                   # نماذج معقدة
│   ├── {form-name}/
│   │   ├── {form-name}.form.ts
│   │   └── validators/
│   └── index.ts
├── {feature}.routes.ts      # مسارات الميزة
└── index.ts                 # نقطة تصدير موحدة
```

#### مثال عملي: ميزة المصادقة (Authentication)

```
presentation/features/auth/
├── pages/
│   ├── login/
│   │   ├── login.component.ts
│   │   ├── login.component.html
│   │   └── login.component.scss
│   ├── register/
│   └── forgot-password/
├── components/
│   ├── auth-form/
│   └── social-login-buttons/
├── services/
│   ├── auth.store.ts
│   └── auth.facade.ts
├── models/
│   ├── login.view-model.ts
│   └── user-profile.view-model.ts
├── forms/
│   ├── login-form/
│   └── register-form/
├── auth.routes.ts
└── index.ts
```

### 2. Shared (المشترك)

المكونات والخدمات القابلة لإعادة الاستخدام:

```
presentation/shared/
├── components/              # مكونات UI قابلة لإعادة الاستخدام
│   ├── ui/                  # مكونات واجهة المستخدم الأساسية
│   │   ├── button/
│   │   ├── input/
│   │   ├── card/
│   │   ├── modal/
│   │   ├── dropdown/
│   │   └── table/
│   ├── feedback/            # مكونات التغذية الراجعة
│   │   ├── loading-spinner/
│   │   ├── error-message/
│   │   ├── toast/
│   │   └── skeleton-loader/
│   ├── navigation/          # مكونات التنقل
│   │   ├── navbar/
│   │   ├── sidebar/
│   │   ├── breadcrumb/
│   │   └── pagination/
│   └── index.ts
├── services/                # خدمات مشتركة للعرض
│   ├── theme.service.ts     # إدارة السمات (Light/Dark)
│   ├── notification.service.ts
│   ├── dialog.service.ts
│   └── index.ts
├── utils/                   # دوال مساعدة للعرض
│   ├── form.utils.ts
│   ├── validation.utils.ts
│   └── index.ts
└── index.ts
```

### 3. Layouts (التخطيطات)

```
presentation/layouts/
├── main-layout/             # التخطيط الرئيسي
│   ├── main-layout.component.ts
│   ├── main-layout.component.html
│   └── main-layout.component.scss
├── auth-layout/             # تخطيط صفحات المصادقة
│   ├── auth-layout.component.ts
│   ├── auth-layout.component.html
│   └── auth-layout.component.scss
├── admin-layout/            # تخطيط لوحة التحكم
│   ├── admin-layout.component.ts
│   ├── admin-layout.component.html
│   └── admin-layout.component.scss
└── index.ts
```

### 4. Guards (الحراس)

```
presentation/guards/
├── auth.guard.ts            # حماية المسارات المصادق عليها
├── role.guard.ts            # حماية حسب الصلاحيات
├── unsaved-changes.guard.ts # تحذير من التغييرات غير المحفوظة
└── index.ts
```

### 5. Interceptors (المعترضات)

```
presentation/interceptors/
├── auth.interceptor.ts      # إضافة Token للطلبات
├── error.interceptor.ts     # معالجة الأخطاء المركزية
├── loading.interceptor.ts   # إدارة حالة التحميل
└── index.ts
```

### 6. Directives (التوجيهات)

```
presentation/directives/
├── click-outside.directive.ts
├── lazy-load.directive.ts
├── permission.directive.ts  # إخفاء/إظهار حسب الصلاحيات
└── index.ts
```

### 7. Pipes (الأنابيب)

```
presentation/pipes/
├── date-format.pipe.ts
├── currency-format.pipe.ts
├── truncate.pipe.ts
├── safe-html.pipe.ts
└── index.ts
```

### 8. Styles (الأنماط)

```
presentation/styles/
├── abstracts/
│   ├── _variables.scss      # المتغيرات
│   ├── _mixins.scss         # Mixins
│   └── _functions.scss      # دوال SCSS
├── base/
│   ├── _reset.scss          # إعادة تعيين الأنماط
│   ├── _typography.scss     # الخطوط
│   └── _animations.scss     # الحركات
├── themes/
│   ├── _light.scss          # السمة الفاتحة
│   └── _dark.scss           # السمة الداكنة
└── main.scss                # ملف الأنماط الرئيسي
```

## أنماط التصميم المستخدمة

### 1. Facade Pattern

استخدام Facade Services لتبسيط التفاعل مع Use Cases:

```typescript
// auth.facade.ts
@Injectable({ providedIn: 'root' })
export class AuthFacade {
  constructor(
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
    private authStore: AuthStore
  ) {}

  async login(credentials: LoginViewModel): Promise<Result<void>> {
    const result = await this.loginUseCase.execute(credentials);
    if (result.isSuccess) {
      this.authStore.setUser(result.value);
    }
    return result;
  }

  logout(): void {
    this.logoutUseCase.execute();
    this.authStore.clearUser();
  }

  // Expose signals for reactive UI
  user = this.authStore.user;
  isAuthenticated = this.authStore.isAuthenticated;
}
```

### 2. Store Pattern with Signals

إدارة الحالة باستخدام Angular Signals:

```typescript
// auth.store.ts
@Injectable({ providedIn: 'root' })
export class AuthStore {
  // Private writable signals
  private _user = signal<UserViewModel | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public readonly signals
  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly userRole = computed(() => this._user()?.role ?? 'guest');

  setUser(user: UserViewModel): void {
    this._user.set(user);
  }

  clearUser(): void {
    this._user.set(null);
  }

  setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  setError(error: string | null): void {
    this._error.set(error);
  }
}
```

### 3. ViewModel Pattern

تحويل Domain Entities إلى ViewModels للعرض:

```typescript
// user-profile.view-model.ts
export interface UserProfileViewModel {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: string;
  displayRole: string;  // نسخة معروضة من الدور
  joinedDate: string;    // تاريخ منسق للعرض
  isActive: boolean;
}

// Mapper function
export function toUserProfileViewModel(user: User): UserProfileViewModel {
  return {
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    avatarUrl: user.avatar || '/assets/default-avatar.png',
    role: user.role,
    displayRole: getRoleDisplayName(user.role),
    joinedDate: formatDate(user.createdAt),
    isActive: user.status === 'active'
  };
}
```

### 4. Smart & Presentational Components

- **Smart Components (Container)**: تتعامل مع منطق الأعمال والحالة
- **Presentational Components (Dumb)**: تستقبل البيانات عبر @Input وترسل الأحداث عبر @Output

```typescript
// Smart Component (Page)
@Component({
  selector: 'app-user-list-page',
  template: `
    <app-user-list
      [users]="users()"
      [loading]="loading()"
      (userSelected)="onUserSelected($event)"
      (deleteUser)="onDeleteUser($event)"
    />
  `
})
export class UserListPageComponent {
  private userFacade = inject(UserFacade);
  
  users = this.userFacade.users;
  loading = this.userFacade.loading;

  ngOnInit() {
    this.userFacade.loadUsers();
  }

  onUserSelected(userId: string) {
    this.router.navigate(['/users', userId]);
  }

  onDeleteUser(userId: string) {
    this.userFacade.deleteUser(userId);
  }
}

// Presentational Component
@Component({
  selector: 'app-user-list',
  template: `
    @if (loading) {
      <app-loading-spinner />
    } @else {
      @for (user of users; track user.id) {
        <app-user-card
          [user]="user"
          (click)="userSelected.emit(user.id)"
          (delete)="deleteUser.emit(user.id)"
        />
      }
    }
  `
})
export class UserListComponent {
  @Input({ required: true }) users!: UserViewModel[];
  @Input() loading = false;
  @Output() userSelected = new EventEmitter<string>();
  @Output() deleteUser = new EventEmitter<string>();
}
```

## إدارة المسارات (Routing)

### هيكل المسارات

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./presentation/features/home/home.routes')
      },
      {
        path: 'users',
        loadChildren: () => import('./presentation/features/users/users.routes'),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./presentation/features/auth/auth.routes')
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

// auth.routes.ts (Feature Routes)
export default [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
] as Routes;
```

## معالجة الأخطاء والتحميل

### نمط موحد لمعالجة الحالات

```typescript
@Component({
  selector: 'app-user-profile-page',
  template: `
    <div class="page-container">
      @if (loading()) {
        <app-loading-spinner />
      } @else if (error()) {
        <app-error-message
          [message]="error()"
          (retry)="loadProfile()"
        />
      } @else if (user()) {
        <app-user-profile [user]="user()!" />
      }
    </div>
  `
})
export class UserProfilePageComponent {
  private userFacade = inject(UserFacade);
  
  user = this.userFacade.currentUser;
  loading = this.userFacade.loading;
  error = this.userFacade.error;

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const userId = this.route.snapshot.params['id'];
    this.userFacade.loadUser(userId);
  }
}
```

## إدارة النماذج

### استخدام Reactive Forms مع Signals

```typescript
// login-form.component.ts
@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <app-input
        formControlName="email"
        label="البريد الإلكتروني"
        type="email"
        [error]="getError('email')"
      />
      
      <app-input
        formControlName="password"
        label="كلمة المرور"
        type="password"
        [error]="getError('password')"
      />

      <app-button
        type="submit"
        [disabled]="form.invalid || submitting()"
        [loading]="submitting()"
      >
        تسجيل الدخول
      </app-button>
    </form>
  `
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<LoginViewModel>();
  
  submitting = input<boolean>(false);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value as LoginViewModel);
    }
  }

  getError(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) return 'هذا الحقل مطلوب';
      if (control.errors?.['email']) return 'البريد الإلكتروني غير صحيح';
      if (control.errors?.['minlength']) return 'كلمة المرور قصيرة جداً';
    }
    return null;
  }
}
```

## التدويل (i18n)

### هيكل ملفات الترجمة

```
src/assets/i18n/
├── ar.json              # العربية
├── en.json              # الإنجليزية
└── fr.json              # الفرنسية
```

### استخدام الترجمة في المكونات

```typescript
// Using Angular's built-in i18n or a library like ngx-translate
@Component({
  template: `
    <h1>{{ 'auth.login.title' | translate }}</h1>
    <p>{{ 'auth.login.description' | translate }}</p>
  `
})
export class LoginComponent {}
```

## استراتيجية الاختبار

### 1. Unit Tests للمكونات

```typescript
describe('LoginComponent', () => {
  let component: LoginComponent;
  let authFacade: jasmine.SpyObj<AuthFacade>;

  beforeEach(() => {
    authFacade = jasmine.createSpyObj('AuthFacade', ['login']);
    
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthFacade, useValue: authFacade }
      ]
    });

    component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('should call authFacade.login when form is submitted', () => {
    const credentials = { email: 'test@test.com', password: 'password123' };
    component.onSubmit(credentials);
    expect(authFacade.login).toHaveBeenCalledWith(credentials);
  });
});
```

### 2. Integration Tests للصفحات

```typescript
describe('UserListPage Integration', () => {
  it('should display users when loaded', async () => {
    const fixture = TestBed.createComponent(UserListPageComponent);
    fixture.detectChanges();
    
    await fixture.whenStable();
    
    const userCards = fixture.nativeElement.querySelectorAll('app-user-card');
    expect(userCards.length).toBeGreaterThan(0);
  });
});
```

## الأداء والتحسينات

### 1. Lazy Loading

جميع الميزات يتم تحميلها بشكل كسول (Lazy Loading) لتحسين وقت التحميل الأولي.

### 2. OnPush Change Detection

```typescript
@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class UserCardComponent {}
```

### 3. TrackBy Functions

```typescript
@Component({
  template: `
    @for (user of users; track user.id) {
      <app-user-card [user]="user" />
    }
  `
})
```

### 4. Virtual Scrolling للقوائم الطويلة

```typescript
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      @for (item of items; track item.id) {
        <div class="item">{{ item.name }}</div>
      }
    </cdk-virtual-scroll-viewport>
  `
})
```

## الخلاصة

هذا التصميم يوفر:

1. **فصل واضح للمسؤوليات**: كل طبقة لها دور محدد
2. **قابلية إعادة الاستخدام**: المكونات المشتركة يمكن استخدامها في أي مكان
3. **سهولة الصيانة**: الهيكل المنظم يسهل العثور على الكود وتعديله
4. **قابلية التوسع**: يمكن إضافة ميزات جديدة بسهولة
5. **الأداء**: استخدام أحدث ميزات Angular للحصول على أفضل أداء
6. **قابلية الاختبار**: الكود منظم بشكل يسهل كتابة الاختبارات
