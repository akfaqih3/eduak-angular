import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthDataSource } from '../auth.datasource';
import { BaseApiService, SingleResponse, ApiResponse } from '../../../core/api';
import {
  LoginResponse,
  TokenVerificationResponse,
  OTPVerificationResponse,
} from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRemoteDataSource extends BaseApiService<any> implements AuthDataSource {
  protected override resourcePath = 'accounts';

  login(email: string, password: string): Observable<LoginResponse> {
    return this.post<SingleResponse<LoginResponse>>('login', { email, password }).pipe(
      map((response) => response.data)
    );
  }

  loginWithGoogle(): Observable<LoginResponse> {
    return this.post<SingleResponse<LoginResponse>>('google/login', {}).pipe(
      map((response) => response.data)
    );
  }

  verifyToken(token: string): Observable<TokenVerificationResponse> {
    return this.post<SingleResponse<TokenVerificationResponse>>('token/verify', { token }).pipe(
      map((response) => response.data)
    );
  }

  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.post<SingleResponse<LoginResponse>>('token/refresh', { refreshToken }).pipe(
      map((response) => response.data)
    );
  }

  logout(): Observable<void> {
    return this.post<ApiResponse<void>>('logout', {}).pipe(map(() => void 0));
  }

  changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<void> {
    return this.post<ApiResponse<void>>('change-password', {
      oldPassword,
      newPassword,
      confirmPassword,
    }).pipe(map(() => void 0));
  }

  sendOTP(email: string): Observable<void> {
    return this.post<ApiResponse<void>>('otp-send', { email }).pipe(map(() => void 0));
  }

  verifyOTP(email: string, otp: string): Observable<OTPVerificationResponse> {
    return this.post<SingleResponse<OTPVerificationResponse>>('otp-verify', { email, otp }).pipe(
      map((response) => response.data)
    );
  }

  resetPassword(email: string): Observable<void> {
    return this.post<ApiResponse<void>>('password-reset', { email }).pipe(map(() => void 0));
  }

  confirmResetPassword(token: string, password: string): Observable<void> {
    return this.post<ApiResponse<void>>('password-reset/confirm', { token, password }).pipe(
      map(() => void 0)
    );
  }

  validateResetPasswordToken(token: string): Observable<TokenVerificationResponse> {
    return this.post<SingleResponse<TokenVerificationResponse>>('password-reset/validate_token', {
      token,
    }).pipe(map((response) => response.data));
  }
}
