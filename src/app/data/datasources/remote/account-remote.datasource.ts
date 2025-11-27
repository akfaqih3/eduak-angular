import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDataSource } from '../account.datasource';
import { AccountModel } from '../../models/account.model';
import { API_ENDPOINTS } from '../../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class AccountRemoteDataSource implements AccountDataSource {
  private http = inject(HttpClient);

  register(account: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(API_ENDPOINTS.ACCOUNT.REGISTER, account);
  }

  update(account: AccountModel): Observable<AccountModel> {
    return this.http.put<AccountModel>(API_ENDPOINTS.ACCOUNT.UPDATE_PROFILE, account);
  }

  getProfile(): Observable<AccountModel> {
    return this.http.get<AccountModel>(API_ENDPOINTS.ACCOUNT.PROFILE);
  }
}
