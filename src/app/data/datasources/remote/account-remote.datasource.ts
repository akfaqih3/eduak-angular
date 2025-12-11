import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountDataSource } from '../account.datasource';
import { AccountModel } from '../../models/account.model';
import { BaseApiService, SingleResponse } from '../../../core/api';
import { API_RESOURCES, ACCOUNT_ENDPOINTS } from '../../../core/constants/api-endpoints';

export class AccountRemoteDataSource
  extends BaseApiService<AccountModel>
  implements AccountDataSource
{
  protected override resourcePath = API_RESOURCES.ACCOUNTS;

  register(account: AccountModel): Observable<AccountModel> {
    return this.post<SingleResponse<AccountModel>>(ACCOUNT_ENDPOINTS.REGISTER, account).pipe(
      map((response) => response.data)
    );
  }

  updateAcount(account: AccountModel): Observable<AccountModel> {
    return this.put<SingleResponse<AccountModel>>(ACCOUNT_ENDPOINTS.UPDATE, account).pipe(
      map((response) => response.data)
    );
  }

  getProfile(): Observable<AccountModel> {
    return this.get<SingleResponse<AccountModel>>(ACCOUNT_ENDPOINTS.PROFILE).pipe(map((response) => response.data));
  }
}
