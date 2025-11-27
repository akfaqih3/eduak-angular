import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class ConfirmResetPasswordUseCase {
  private repository = inject(AuthRepository);

  execute(token: string, password: string): Promise<Result<void, DomainError>> {
    return this.repository.confirmResetPassword(token, password);
  }
}
