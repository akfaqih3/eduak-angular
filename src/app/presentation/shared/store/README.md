# Base Store Pattern

نظام إدارة الحالة باستخدام Angular Signals.

## نظرة عامة

يوفر `BaseStore` نمطاً أساسياً لإدارة الحالة في التطبيق باستخدام Angular Signals. يتضمن إدارة تلقائية لحالات التحميل والأخطاء والبيانات.

## الميزات

- ✅ إدارة حالة تفاعلية باستخدام Signals
- ✅ إدارة تلقائية لحالات التحميل والأخطاء
- ✅ Computed signals للحالات الشائعة
- ✅ دوال مساعدة لتنفيذ العمليات غير المتزامنة
- ✅ Type-safe مع دعم كامل لـ TypeScript

## الاستخدام الأساسي

### 1. إنشاء Store بسيط

```typescript
import { Injectable } from '@angular/core';
import { BaseStore, BaseState, createInitialState } from '@presentation/shared/store';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserStore extends BaseStore<User[]> {
  constructor() {
    super(createInitialState<User[]>([]));
  }

  // إضافة مستخدم
  addUser(user: User): void {
    const currentUsers = this.data() || [];
    this.setData([...currentUsers, user]);
  }

  // حذف مستخدم
  removeUser(userId: string): void {
    const currentUsers = this.data() || [];
    this.setData(currentUsers.filter(u => u.id !== userId));
  }

  // تحميل المستخدمين من API
  async loadUsers(apiCall: () => Promise<User[]>): Promise<void> {
    await this.executeAsync(
      apiCall,
      (users) => this.setData(users)
    );
  }
}
```

### 2. إنشاء Store مع حالة مخصصة

```typescript
import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { BaseStore, BaseState, createInitialState } from '@presentation/shared/store';

interface User {
  id: string;
  name: string;
  role: string;
}

// توسيع BaseState بخصائص إضافية
interface UserState extends BaseState<User[]> {
  selectedUserId: string | null;
  filter: string;
}

@Injectable({ providedIn: 'root' })
export class UserStore extends BaseStore<User[], UserState> {
  // Signals إضافية خاصة بالـ Store
  private _selectedUserId = signal<string | null>(null);
  private _filter = signal<string>('');

  readonly selectedUserId = this._selectedUserId.asReadonly();
  readonly filter = this._filter.asReadonly();

  // Computed signals
  readonly selectedUser = computed(() => {
    const users = this.data();
    const selectedId = this._selectedUserId();
    return users?.find(u => u.id === selectedId) || null;
  });

  readonly filteredUsers = computed(() => {
    const users = this.data() || [];
    const filter = this._filter().toLowerCase();
    if (!filter) return users;
    return users.filter(u => u.name.toLowerCase().includes(filter));
  });

  constructor() {
    super({
      ...createInitialState<User[]>([]),
      selectedUserId: null,
      filter: ''
    });
  }

  selectUser(userId: string | null): void {
    this._selectedUserId.set(userId);
    this.patchState({ selectedUserId: userId });
  }

  setFilter(filter: string): void {
    this._filter.set(filter);
    this.patchState({ filter });
  }

  async loadUsers(apiCall: () => Promise<User[]>): Promise<void> {
    await this.executeAsync(
      apiCall,
      (users) => this.setData(users)
    );
  }
}
```

### 3. استخدام Store في المكونات

```typescript
import { Component, inject } from '@angular/core';
import { UserStore } from './user.store';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      @if (userStore.loading()) {
        <app-loading-spinner />
      } @else if (userStore.hasError()) {
        <app-error-message [message]="userStore.error()!" />
      } @else {
        <input 
          type="text" 
          [value]="userStore.filter()"
          (input)="onFilterChange($event)"
          placeholder="بحث..."
        />
        
        @for (user of userStore.filteredUsers(); track user.id) {
          <app-user-card 
            [user]="user"
            [selected]="user.id === userStore.selectedUserId()"
            (click)="userStore.selectUser(user.id)"
          />
        }
      }
    </div>
  `
})
export class UserListComponent {
  userStore = inject(UserStore);

  ngOnInit() {
    this.userStore.loadUsers(() => this.userApi.getUsers());
  }

  onFilterChange(event: Event): void {
    const filter = (event.target as HTMLInputElement).value;
    this.userStore.setFilter(filter);
  }
}
```

## API Reference

### BaseState<T>

```typescript
interface BaseState<T = unknown> {
  loading: boolean;      // حالة التحميل
  error: string | null;  // رسالة الخطأ
  data: T | null;        // البيانات
}
```

### BaseStore<T, S>

#### Signals العامة

- `loading: Signal<boolean>` - حالة التحميل
- `error: Signal<string | null>` - رسالة الخطأ
- `data: Signal<T | null>` - البيانات
- `hasError: Signal<boolean>` - هل يوجد خطأ؟
- `hasData: Signal<boolean>` - هل توجد بيانات؟
- `isIdle: Signal<boolean>` - هل الـ Store في حالة خمول؟

#### الدوال المحمية (للاستخدام داخل الـ Store)

- `getState(): S` - الحصول على الحالة الكاملة
- `setState(state: S): void` - تحديث الحالة بالكامل
- `patchState(partialState: Partial<S>): void` - تحديث جزء من الحالة
- `setLoading(loading: boolean): void` - تعيين حالة التحميل
- `setError(error: string | null): void` - تعيين رسالة الخطأ
- `setData(data: T | null): void` - تعيين البيانات
- `clearError(): void` - مسح رسالة الخطأ
- `reset(initialState: S): void` - إعادة تعيين الحالة
- `executeAsync<R>(operation, onSuccess?, onError?): Promise<R | null>` - تنفيذ عملية غير متزامنة مع إدارة تلقائية للحالة

## أفضل الممارسات

### 1. استخدم Computed Signals للبيانات المشتقة

```typescript
readonly activeUsers = computed(() => 
  this.data()?.filter(u => u.isActive) || []
);
```

### 2. اجعل الـ Signals للقراءة فقط خارج الـ Store

```typescript
private _selectedId = signal<string | null>(null);
readonly selectedId = this._selectedId.asReadonly();
```

### 3. استخدم executeAsync للعمليات غير المتزامنة

```typescript
async loadData(): Promise<void> {
  await this.executeAsync(
    () => this.api.getData(),
    (data) => this.setData(data),
    (error) => console.error('Failed to load data:', error)
  );
}
```

### 4. فصل منطق الأعمال عن الـ Store

```typescript
// ❌ سيء - منطق أعمال في الـ Store
async createUser(userData: CreateUserDto): Promise<void> {
  if (!userData.email.includes('@')) {
    this.setError('البريد الإلكتروني غير صحيح');
    return;
  }
  // ...
}

// ✅ جيد - استخدم Use Cases
async createUser(useCase: CreateUserUseCase, userData: CreateUserDto): Promise<void> {
  await this.executeAsync(
    () => useCase.execute(userData),
    (user) => {
      const users = this.data() || [];
      this.setData([...users, user]);
    }
  );
}
```

## أمثلة متقدمة

### Store مع Pagination

```typescript
interface PaginatedState<T> extends BaseState<T[]> {
  page: number;
  pageSize: number;
  total: number;
}

export class PaginatedStore<T> extends BaseStore<T[], PaginatedState<T>> {
  private _page = signal(1);
  private _pageSize = signal(10);
  private _total = signal(0);

  readonly page = this._page.asReadonly();
  readonly pageSize = this._pageSize.asReadonly();
  readonly total = this._total.asReadonly();
  readonly totalPages = computed(() => Math.ceil(this._total() / this._pageSize()));
  readonly hasNextPage = computed(() => this._page() < this.totalPages());
  readonly hasPreviousPage = computed(() => this._page() > 1);

  constructor() {
    super({
      ...createInitialState<T[]>([]),
      page: 1,
      pageSize: 10,
      total: 0
    });
  }

  setPage(page: number): void {
    this._page.set(page);
    this.patchState({ page });
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.setPage(this._page() + 1);
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.setPage(this._page() - 1);
    }
  }

  setPaginatedData(data: T[], total: number): void {
    this._total.set(total);
    this.setData(data);
    this.patchState({ total });
  }
}
```

## الخلاصة

`BaseStore` يوفر أساساً قوياً لإدارة الحالة في تطبيقات Angular باستخدام Signals. يمكن توسيعه بسهولة لتلبية احتياجات مختلفة مع الحفاظ على نمط موحد عبر التطبيق.
