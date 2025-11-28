import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthDataSource } from '../auth.datasource';

@Injectable({
    providedIn: 'root'
})
export class AuthRemoteDataSource extends AuthDataSource {

    // TODO: Inject HttpClient here when available
    // constructor(private http: HttpClient) { super(); }

    login(email: string, password: string): Observable<any> {
        // Mock implementation
        return of({ token: 'mock-token', refreshToken: 'mock-refresh-token' });
    }

    loginWithGoogle(): Observable<any> {
        return of({ token: 'mock-google-token', refreshToken: 'mock-refresh-token' });
    }

    verifyToken(token: string): Observable<any> {
        return of({ valid: true });
    }

    refreshToken(refreshToken: string): Observable<any> {
        return of({ token: 'new-mock-token', refreshToken: 'new-mock-refresh-token' });
    }

    logout(): Observable<void> {
        return of(void 0);
    }

    changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<void> {
        return of(void 0);
    }

    sendOTP(email: string): Observable<void> {
        return of(void 0);
    }

    verifyOTP(email: string, otp: string): Observable<any> {
        return of({ valid: true, token: 'mock-otp-token' });
    }

    resetPassword(email: string): Observable<void> {
        return of(void 0);
    }

    confirmResetPassword(token: string, password: string): Observable<void> {
        return of(void 0);
    }

    validateResetPasswordToken(token: string): Observable<any> {
        return of({ valid: true });
    }
}
