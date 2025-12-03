import { TestBed } from '@angular/core/testing';
import { AuthStore } from './auth.store';
import { UserProfileViewModel } from '../models/user-profile.view-model';
import { RoleEnum } from '../../../../domain/entities/account.entity';

describe('AuthStore', () => {
  let store: AuthStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStore]
    });
    store = TestBed.inject(AuthStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with null user and not authenticated', () => {
    expect(store.user()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.token()).toBeNull();
  });

  it('should have computed signals from BaseStore', () => {
    expect(store.hasError()).toBe(false);
    expect(store.hasData()).toBe(false);
    expect(store.isIdle()).toBe(true);
  });

  it('should set user and update isAuthenticated computed signal', () => {
    const mockUser: UserProfileViewModel = {
      email: 'test@example.com',
      name: 'Test User',
      phone: null,
      photo: '/assets/avatar.png',
      bio: 'Test bio',
      role: RoleEnum.Teacher,
      displayRole: 'معلم',
      isTeacher: true,
      isStudent: false
    };

    store.setAuthToken('mock-token');
    store.setUser(mockUser);

    expect(store.user()).toEqual(mockUser);
    expect(store.data()).toEqual(mockUser); // BaseStore data property
    expect(store.isAuthenticated()).toBe(true);
    expect(store.userRole()).toBe(RoleEnum.Teacher);
    expect(store.isTeacher()).toBe(true);
    expect(store.isStudent()).toBe(false);
    expect(store.hasData()).toBe(true);
  });

  it('should use login method to set user and token', () => {
    const mockUser: UserProfileViewModel = {
      email: 'student@example.com',
      name: 'Student User',
      phone: '1234567890',
      photo: '/assets/student.png',
      bio: 'Student bio',
      role: RoleEnum.Student,
      displayRole: 'طالب',
      isTeacher: false,
      isStudent: true
    };

    store.login(mockUser, 'auth-token-123');

    expect(store.user()).toEqual(mockUser);
    expect(store.token()).toBe('auth-token-123');
    expect(store.isAuthenticated()).toBe(true);
    expect(store.isStudent()).toBe(true);
  });

  it('should clear user on logout', () => {
    const mockUser: UserProfileViewModel = {
      email: 'test@example.com',
      name: 'Test User',
      phone: null,
      photo: '/assets/avatar.png',
      bio: 'Test bio',
      role: RoleEnum.Student,
      displayRole: 'طالب',
      isTeacher: false,
      isStudent: true
    };

    store.login(mockUser, 'mock-token');
    expect(store.isAuthenticated()).toBe(true);

    store.logout();
    expect(store.user()).toBeNull();
    expect(store.token()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });

  it('should compute userRole as Student by default', () => {
    expect(store.userRole()).toBe(RoleEnum.Student);
  });

  it('should update user partially', () => {
    const mockUser: UserProfileViewModel = {
      email: 'test@example.com',
      name: 'Test User',
      phone: null,
      photo: '/assets/avatar.png',
      bio: 'Test bio',
      role: RoleEnum.Student,
      displayRole: 'طالب',
      isTeacher: false,
      isStudent: true
    };

    store.setUser(mockUser);
    
    store.updateUser({ name: 'Updated Name', bio: 'Updated bio' });
    
    expect(store.user()?.name).toBe('Updated Name');
    expect(store.user()?.bio).toBe('Updated bio');
    expect(store.user()?.email).toBe('test@example.com');
  });

  it('should reset store to initial state', () => {
    const mockUser: UserProfileViewModel = {
      email: 'test@example.com',
      name: 'Test User',
      phone: null,
      photo: '/assets/avatar.png',
      bio: 'Test bio',
      role: RoleEnum.Teacher,
      displayRole: 'معلم',
      isTeacher: true,
      isStudent: false
    };

    store.login(mockUser, 'mock-token');

    store.resetAuth();

    expect(store.user()).toBeNull();
    expect(store.token()).toBeNull();
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });

  it('should compute userName, userEmail, and userPhoto with defaults', () => {
    expect(store.userName()).toBe('مستخدم');
    expect(store.userEmail()).toBe('');
    expect(store.userPhoto()).toBe('/assets/default-avatar.png');
  });

  it('should compute userName, userEmail, and userPhoto correctly when user is set', () => {
    const mockUser: UserProfileViewModel = {
      email: 'test@example.com',
      name: 'Test User',
      phone: null,
      photo: '/assets/custom-avatar.png',
      bio: 'Test bio',
      role: RoleEnum.Student,
      displayRole: 'طالب',
      isTeacher: false,
      isStudent: true
    };

    store.setUser(mockUser);

    expect(store.userName()).toBe('Test User');
    expect(store.userEmail()).toBe('test@example.com');
    expect(store.userPhoto()).toBe('/assets/custom-avatar.png');
  });

  it('should manage token independently', () => {
    expect(store.token()).toBeNull();

    store.setAuthToken('new-token');
    expect(store.token()).toBe('new-token');

    store.clearToken();
    expect(store.token()).toBeNull();
  });
});
