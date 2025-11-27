import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountDataSource } from '../datasources/account.datasource';
import { AccountMapper } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountRepositoryImpl implements AccountRepository {
  private dataSource = inject(AccountDataSource);

  async register(account: AccountEntity): Promise<AccountEntity> {
    const model = AccountMapper.toModel(account);
    return firstValueFrom(
      this.dataSource.register(model).pipe(map(AccountMapper.toDomain))
    );
  }

  async update(account: AccountEntity): Promise<AccountEntity> {
    const model = AccountMapper.toModel(account);
    return firstValueFrom(
      this.dataSource.update(model).pipe(map(AccountMapper.toDomain))
    );
  }

  async getProfile(): Promise<AccountEntity> {
    return firstValueFrom(
      this.dataSource.getProfile().pipe(map(AccountMapper.toDomain))
    );
  }
}
