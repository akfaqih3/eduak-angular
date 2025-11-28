import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountDataSource } from '../account.datasource';
import { AccountModel } from '../../models/account.model';
import { BaseApiService, SingleResponse } from '../../../core/api';

@Injectable({
  providedIn: 'root',
})
export class AccountRemoteDataSource
  extends BaseApiService<AccountModel>
  implements AccountDataSource
{
  protected override resourcePath = 'accounts';

  register(account: AccountModel): Observable<AccountModel> {
    return this.post<SingleResponse<AccountModel>>('register', account).pipe(
      map((response) => response.data)
    );
  }

  updateAcount(account: AccountModel): Observable<AccountModel> {
    return this.put<SingleResponse<AccountModel>>('update', account).pipe(
      map((response) => response.data)
    );
  }

  getProfile(): Observable<AccountModel> {
    return this.get<SingleResponse<AccountModel>>('profile').pipe(map((response) => response.data));
  }
}
