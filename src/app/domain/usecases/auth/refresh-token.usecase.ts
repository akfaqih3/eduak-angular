import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenUseCase {
  private repository = inject(AuthRepository);

  execute(refreshToken: string): Promise<Result<any, DomainError>> {
    return this.repository.refreshToken(refreshToken);
  }
}
