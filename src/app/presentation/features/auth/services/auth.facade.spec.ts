// import { TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { AuthFacade } from './auth.facade';
// import { AuthStore } from './auth.store';
// import { LoginUseCase } from '../../../../domain/usecases/auth/login.usecase';
// import { LogoutUseCase } from '../../../../domain/usecases/auth/logout.usecase';
// import { RegisterUseCase } from '../../../../domain/usecases/account/register.usecase';
// import { GetProfileUseCase } from '../../../../domain/usecases/account/get-profile.usecase';
// import { Result } from '../../../../core/result/result';
// import { AccountEntity, RoleEnum } from '../../../../domain/entities/account.entity';
// import { LoginResponse } from '../../../../data/models/auth.model';

// describe('AuthFacade', () => {
//   let facade: AuthFacade;
//   let authStore: jasmine.SpyObj<AuthStore>;
//   let loginUseCase: jasmine.SpyObj<LoginUseCase>;
//   let logoutUseCase: jasmine.SpyObj<LogoutUseCase>;
//   let registerUseCase: jasmine.SpyObj<RegisterUseCase>;
//   let getProfileUseCase: jasmine.SpyObj<GetProfileUseCase>;
//   let router: jasmine.SpyObj<Router>;

//   const mockAccount: AccountEntity = {
//     email: 'test@example.com',
//     name: 'Test User',
//     phone: '1234567890',
//     photo: '/assets/avatar.png',
//     bio: 'Test bio',
//     role: RoleEnum.Student
//   };

//   const mockLoginResponse: LoginResponse = {
//     token: 'mock-token',
//     refreshToken: 'mock-refresh-token'
//   };

//   beforeEach(() => {
//     const authStoreSpy = jasmine.createSpyObj('AuthStore', [
//       'setAuthToken',
//       'setUser',
//       'logout',
//       'updateUser',
//       'resetAuth'
//     ]);

//     const loginUseCaseSpy = jasmine.createSpyObj('LoginUseCase', ['execute']);
//     const logoutUseCaseSpy = jasmine.createSpyObj('LogoutUseCase', ['execute']);
//     const registerUseCaseSpy = jasmine.createSpyObj('RegisterUseCase', ['execute']);
//     const getProfileUseCaseSpy = jasmine.createSpyObj('GetProfileUseCase', ['execute']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       providers: [
//         AuthFacade,
//         { provide: AuthStore, useValue: authStoreSpy },
//         { provide: LoginUseCase, useValue: loginUseCaseSpy },
//         { provide: LogoutUseCase, useValue: logoutUseCaseSpy },
//         { provide: RegisterUseCase, useValue: registerUseCaseSpy },
//         { provide: GetProfileUseCase, useValue: getProfileUseCaseSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     });

//     facade = TestBed.inject(AuthFacade);
//     authStore = TestBed.inject(AuthStore) as jasmine.SpyObj<AuthStore>;
//     loginUseCase = TestBed.inject(LoginUseCase) as jasmine.SpyObj<LoginUseCase>;
//     logoutUseCase = TestBed.inject(LogoutUseCase) as jasmine.SpyObj<LogoutUseCase>;
//     registerUseCase = TestBed.inject(RegisterUseCase) as jasmine.SpyObj<RegisterUseCase>;
//     getProfileUseCase = TestBed.inject(GetProfileUseCase) as jasmine.SpyObj<GetProfileUseCase>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   it('should be created', () => {
//     expect(facade).toBeTruthy();
//   });

//   describe('login', () => {
//     it('should call loginUseCase and store token on success', async () => {
//       loginUseCase.execute.and.returnValue(
//         Promise.resolve(Result.success(mockLoginResponse))
//       );
//       getProfileUseCase.execute.and.returnValue(
//         Promise.resolve(Result.success(mockAccount))
//       );

//       const result = await facade.login('test@example.com', 'password123');

//       expect(result).toBe(true);
//       expect(loginUseCase.execute).toHaveBeenCalledWith('test@example.com', 'password123');
//       expect(authStore.setAuthToken).toHaveBeenCalledWith(mockLoginResponse.token);
//     });

//     it('should return false on login failure', async () => {
//       loginUseCase.execute.and.returnValue(
//         Promise.resolve(Result.failure({ message: 'Invalid credentials' } as any))
//       );

//       const result = await facade.login('test@example.com', 'wrong-password');

//       expect(result).toBe(false);
//     });
//   });

//   describe('logout', () => {
//     it('should call logoutUseCase and clear auth state', async () => {
//       logoutUseCase.execute.and.returnValue(
//         Promise.resolve(Result.success(undefined))
//       );
//       router.navigate.and.returnValue(Promise.resolve(true));

//       const result = await facade.logout();

//       expect(result).toBe(true);
//       expect(logoutUseCase.execute).toHaveBeenCalled();
//       expect(authStore.logout).toHaveBeenCalled();
//       expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
//     });
//   });

//   describe('register', () => {
//     it('should call registerUseCase and navigate to login on success', async () => {
//       registerUseCase.execute.and.returnValue(
//         Promise.resolve(Result.success(mockAccount))
//       );
//       router.navigate.and.returnValue(Promise.resolve(true));

//       const result = await facade.register(mockAccount);

//       expect(result).toBe(true);
//       expect(registerUseCase.execute).toHaveBeenCalledWith(mockAccount);
//       expect(authStore.setUser).toHaveBeenCalled();
//       expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
//     });
//   });

//   describe('loadUserProfile', () => {
//     it('should fetch and store user profile', async () => {
//       getProfileUseCase.execute.and.returnValue(
//         Promise.resolve(Result.success(mockAccount))
//       );

//       const result = await facade.loadUserProfile();

//       expect(result).toBe(true);
//       expect(getProfileUseCase.execute).toHaveBeenCalled();
//       expect(authStore.setUser).toHaveBeenCalled();
//     });
//   });

//   describe('updateUserProfile', () => {
//     it('should update user profile in store', () => {
//       const updates = { name: 'Updated Name' };

//       facade.updateUserProfile(updates);

//       expect(authStore.updateUser).toHaveBeenCalledWith(updates);
//     });
//   });

//   describe('clearAuthState', () => {
//     it('should reset auth state', () => {
//       facade.clearAuthState();

//       expect(authStore.resetAuth).toHaveBeenCalled();
//     });
//   });
// });
