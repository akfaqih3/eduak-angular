import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthDataSource } from '../datasources/auth.datasource';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';
import { ErrorMapper } from '../../core/result/error-mapper';


export class AuthRepositoryImpl implements AuthRepository {

    constructor(private dataSource: AuthDataSource) {}
    async login(email: string, password: string): Promise<Result<any, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.login(email, password));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async loginWithGoogle(): Promise<Result<any, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.loginWithGoogle());
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async verifyToken(token: string): Promise<Result<any, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.verifyToken(token));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async refreshToken(refreshToken: string): Promise<Result<any, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.refreshToken(refreshToken));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async logout(): Promise<Result<void, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.logout());
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Promise<Result<void, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.changePassword(oldPassword, newPassword, confirmPassword));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async sendOTP(email: string): Promise<Result<void, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.sendOTP(email));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async verifyOTP(email: string, otp: string): Promise<Result<any, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.verifyOTP(email, otp));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async resetPassword(email: string): Promise<Result<void, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.resetPassword(email));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async confirmResetPassword(token: string, password: string): Promise<Result<void, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.confirmResetPassword(token, password));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }

    async validateResetPasswordToken(token: string): Promise<Result<any, DomainError>> {
        try {
            const result = await firstValueFrom(this.dataSource.validateResetPasswordToken(token));
            return Result.success(result);
        } catch (error) {
            return Result.failure(ErrorMapper.fromError(error));
        }
    }
}
