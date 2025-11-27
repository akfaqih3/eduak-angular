import { Injectable, inject } from '@angular/core';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountEntity } from '../../entities/account.entity';
import { Result } from '../../../core/result/result';
import { DomainError } from '../../../core/errors/domain-error';

@Injectable({
  providedIn: 'root',
})
export class RegisterUseCase {
  private repository = inject(AccountRepository);

  execute(account: AccountEntity): Promise<Result<AccountEntity, DomainError>> {
    return this.repository.register(account);
  }
}
