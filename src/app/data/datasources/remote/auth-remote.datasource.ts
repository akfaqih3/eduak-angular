import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthDataSource } from '../auth.datasource';
import { BaseApiService, SingleResponse, ApiResponse } from '../../../core/api';
import {
  LoginResponse,
  TokenVerificationResponse,
  OTPVerificationResponse,
} from '../../models/auth.model';
import { API_RESOURCES, AUTH_ENDPOINTS } from '../../../core/constants/api-endpoints';

export class AuthRemoteDataSource extends BaseApiService<any> implements AuthDataSource {
  protected override resourcePath = API_RESOURCES.ACCOUNTS;

  login(email: string, password: string): Observable<LoginResponse> {
    return this.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, { email, password });
  }

  loginWithGoogle(): Observable<LoginResponse> {
    return this.post<SingleResponse<LoginResponse>>(AUTH_ENDPOINTS.GOOGLE_LOGIN, {}).pipe(
      map((response) => response.data)
    );
  }

  verifyToken(token: string): Observable<TokenVerificationResponse> {
    return this.post<SingleResponse<TokenVerificationResponse>>(AUTH_ENDPOINTS.TOKEN_VERIFY, { token }).pipe(
      map((response) => response.data)
    );
  }

  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.post<SingleResponse<LoginResponse>>(AUTH_ENDPOINTS.TOKEN_REFRESH, { refreshToken }).pipe(
      map((response) => response.data)
    );
  }

  logout(): Observable<void> {
    return this.post<ApiResponse<void>>(AUTH_ENDPOINTS.LOGOUT, {}).pipe(map(() => void 0));
  }

  changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<void> {
    return this.post<ApiResponse<void>>(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
      confirmPassword,
    }).pipe(map(() => void 0));
  }

  sendOTP(email: string): Observable<void> {
    return this.post<ApiResponse<void>>(AUTH_ENDPOINTS.OTP_SEND, { email }).pipe(map(() => void 0));
  }

  verifyOTP(email: string, otp: string): Observable<OTPVerificationResponse> {
    return this.post<SingleResponse<OTPVerificationResponse>>(AUTH_ENDPOINTS.OTP_VERIFY, { email, otp }).pipe(
      map((response) => response.data)
    );
  }

  resetPassword(email: string): Observable<void> {
    return this.post<ApiResponse<void>>(AUTH_ENDPOINTS.PASSWORD_RESET, { email }).pipe(map(() => void 0));
  }

  confirmResetPassword(token: string, password: string): Observable<void> {
    return this.post<ApiResponse<void>>(AUTH_ENDPOINTS.PASSWORD_RESET_CONFIRM, { token, password }).pipe(
      map(() => void 0)
    );
  }

  validateResetPasswordToken(token: string): Observable<TokenVerificationResponse> {
    return this.post<SingleResponse<TokenVerificationResponse>>(AUTH_ENDPOINTS.PASSWORD_RESET_VALIDATE_TOKEN, {
      token,
    }).pipe(map((response) => response.data));
  }
}
