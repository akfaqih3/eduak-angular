import { AccountEntity } from '../entities/account.entity';
import { Result } from '../../core/result/result';
import { DomainError } from '../../core/errors/domain-error';

export abstract class AccountRepository {

    abstract register(account: AccountEntity): Promise<Result<AccountEntity, DomainError>>;

    abstract update(account: AccountEntity): Promise<Result<AccountEntity, DomainError>>;

    abstract getProfile(): Promise<Result<AccountEntity, DomainError>>;
}
