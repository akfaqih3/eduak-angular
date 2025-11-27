import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class ValidateResetPasswordTokenUseCase {
  private repository = inject(AuthRepository);

  execute(token: string): Promise<any> {
    return this.repository.validateResetPasswordToken(token);
  }
}
