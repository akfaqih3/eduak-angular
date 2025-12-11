import { Injectable } from '@angular/core';
import { AuthRepository } from '../../repositories/auth.repository';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCase {

  constructor(private repository: AuthRepository) {}
  execute(): Promise<Result<void, DomainError>> {
    return this.repository.logout();
  }
}
