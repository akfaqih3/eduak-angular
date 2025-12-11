import { firstValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountDataSource } from '../datasources/account.datasource';
import { AccountMapper } from '../models/account.model';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';
import { ErrorMapper } from '../../core/result/error-mapper';

export class AccountRepositoryImpl implements AccountRepository {

  constructor(private dataSource: AccountDataSource) {}
  async register(account: AccountEntity): Promise<Result<AccountEntity, DomainError>> {
    try {
      const model = AccountMapper.toModel(account);
      const result = await firstValueFrom(
        this.dataSource.register(model).pipe(map(AccountMapper.toDomain))
      );
      return Result.success(result);
    } catch (error) {
      return Result.failure(ErrorMapper.fromError(error));
    }
  }

  async update(account: AccountEntity): Promise<Result<AccountEntity, DomainError>> {
    try {
      const model = AccountMapper.toModel(account);
      const result = await firstValueFrom(
        this.dataSource.updateAcount(model).pipe(map(AccountMapper.toDomain))
      );
      return Result.success(result);
    } catch (error) {
      return Result.failure(ErrorMapper.fromError(error));
    }
  }

  async getProfile(): Promise<Result<AccountEntity, DomainError>> {
    try {
      const result = await firstValueFrom(
        this.dataSource.getProfile().pipe(map(AccountMapper.toDomain))
      );
      return Result.success(result);
    } catch (error) {
      return Result.failure(ErrorMapper.fromError(error));
    }
  }
}
