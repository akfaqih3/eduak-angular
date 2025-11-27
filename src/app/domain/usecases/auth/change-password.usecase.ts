import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordUseCase {
  private repository = inject(AuthRepository);

  execute(oldPassword: string, newPassword: string, confirmPassword: string): Promise<Result<void, DomainError>> {
    return this.repository.changePassword(oldPassword, newPassword, confirmPassword);
  }
}
