import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordUseCase {
  private repository = inject(AuthRepository);

  execute(email: string): Promise<Result<void, DomainError>> {
    return this.repository.resetPassword(email);
  }
}
