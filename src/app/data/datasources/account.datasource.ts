import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountModel } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export abstract class AccountDataSource {
  abstract register(account: AccountModel): Observable<AccountModel>;
  abstract updateAcount(account: AccountModel): Observable<AccountModel>;
  abstract getProfile(): Observable<AccountModel>;
}
