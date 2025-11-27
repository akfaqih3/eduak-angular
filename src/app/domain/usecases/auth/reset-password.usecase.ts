import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordUseCase {
  private repository = inject(AuthRepository);

  execute(email: string): Promise<any> {
    return this.repository.resetPassword(email);
  }
}
