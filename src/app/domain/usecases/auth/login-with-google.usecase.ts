import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class LoginWithGoogleUseCase {
  private repository = inject(AuthRepository);

  execute(): Promise<Result<any, DomainError>> {
    return this.repository.loginWithGoogle();
  }
}
