import { Injectable, inject } from '@angular/core';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountEntity } from '../../entities/account.entity';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileUseCase {
  private repository = inject(AccountRepository);

  execute(account: AccountEntity): Promise<AccountEntity> {
    return this.repository.update(account);
  }
}
