import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class ValidateResetPasswordTokenUseCase {
  private repository = inject(AuthRepository);

  execute(token: string): Promise<Result<any, DomainError>> {
    return this.repository.validateResetPasswordToken(token);
  }
}
