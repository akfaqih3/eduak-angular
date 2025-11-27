import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class ConfirmResetPasswordUseCase {
  private repository = inject(AuthRepository);

  execute(token: string, password: string): Promise<any> {
    return this.repository.confirmResetPassword(token, password);
  }
}
