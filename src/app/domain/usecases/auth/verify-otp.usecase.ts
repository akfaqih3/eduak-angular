import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class VerifyOTPUseCase {
  private repository = inject(AuthRepository);

  execute(email: string, otp: string): Promise<any> {
    return this.repository.verifyOTP(email, otp);
  }
}
