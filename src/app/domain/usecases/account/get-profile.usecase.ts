import { Injectable, inject } from '@angular/core';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountEntity } from '../../entities/account.entity';

@Injectable({
  providedIn: 'root',
})
export class GetProfileUseCase {
  private repository = inject(AccountRepository);

  execute(): Promise<AccountEntity> {
    return this.repository.getProfile();
  }
}
