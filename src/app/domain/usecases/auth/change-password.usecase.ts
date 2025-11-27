import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordUseCase {
  private repository = inject(AuthRepository);

  execute(oldPassword: string, newPassword: string, confirmPassword: string): Promise<any> {
    return this.repository.changePassword(oldPassword, newPassword, confirmPassword);
  }
}
