
export abstract class AuthRepository {

    abstract login(email: string, password: string): Promise<any>;

    abstract loginWithGoogle(): Promise<any>;

    abstract verifyToken(token: string): Promise<any>;

    abstract refreshToken(refreshToken: string): Promise<any>;

    abstract logout(): Promise<any>;

    abstract changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Promise<any>;

    abstract sendOTP(email: string): Promise<any>;

    abstract verifyOTP(email: string, otp: string): Promise<any>;

    abstract resetPassword(email: string): Promise<any>;

    abstract confirmResetPassword(token: string, password: string): Promise<any>;

    abstract validateResetPasswordToken(token: string): Promise<any>;



}
