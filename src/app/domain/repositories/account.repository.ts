import { AccountEntity } from '../entities/account.entity';

export abstract class AccountRepository {

    abstract register(account: AccountEntity): Promise<AccountEntity>;

    abstract update(account: AccountEntity): Promise<AccountEntity>;

    abstract getProfile(): Promise<AccountEntity>;
}
