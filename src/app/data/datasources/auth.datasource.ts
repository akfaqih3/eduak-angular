import { Observable } from 'rxjs';

export abstract class AuthDataSource {
    abstract login(email: string, password: string): Observable<any>;
    abstract loginWithGoogle(): Observable<any>;
    abstract verifyToken(token: string): Observable<any>;
    abstract refreshToken(refreshToken: string): Observable<any>;
    abstract logout(): Observable<void>;
    abstract changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<void>;
    abstract sendOTP(email: string): Observable<void>;
    abstract verifyOTP(email: string, otp: string): Observable<any>;
    abstract resetPassword(email: string): Observable<void>;
    abstract confirmResetPassword(token: string, password: string): Observable<void>;
    abstract validateResetPasswordToken(token: string): Observable<any>;
}
