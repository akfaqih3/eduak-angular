import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDataSource } from '../account.datasource';
import { AccountModel } from '../../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountRemoteDataSource implements AccountDataSource {
  private http = inject(HttpClient);
  private apiUrl = '/api/accounts';

  register(account: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(`${this.apiUrl}/register`, account);
  }

  update(account: AccountModel): Observable<AccountModel> {
    return this.http.put<AccountModel>(`${this.apiUrl}/profile`, account);
  }

  getProfile(): Observable<AccountModel> {
    return this.http.get<AccountModel>(`${this.apiUrl}/profile`);
  }
}
