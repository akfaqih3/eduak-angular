import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class SendOTPUseCase {
  private repository = inject(AuthRepository);

  execute(email: string): Promise<any> {
    return this.repository.sendOTP(email);
  }
}
