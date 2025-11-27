import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';

export abstract class AuthRepository {

    abstract login(email: string, password: string): Promise<Result<any, DomainError>>;

    abstract loginWithGoogle(): Promise<Result<any, DomainError>>;

    abstract verifyToken(token: string): Promise<Result<any, DomainError>>;

    abstract refreshToken(refreshToken: string): Promise<Result<any, DomainError>>;

    abstract logout(): Promise<Result<void, DomainError>>;

    abstract changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Promise<Result<void, DomainError>>;

    abstract sendOTP(email: string): Promise<Result<void, DomainError>>;

    abstract verifyOTP(email: string, otp: string): Promise<Result<any, DomainError>>;

    abstract resetPassword(email: string): Promise<Result<void, DomainError>>;

    abstract confirmResetPassword(token: string, password: string): Promise<Result<void, DomainError>>;

    abstract validateResetPasswordToken(token: string): Promise<Result<any, DomainError>>;

}
