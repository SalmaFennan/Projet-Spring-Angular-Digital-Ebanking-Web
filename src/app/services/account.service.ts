import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../model/account.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private baseUrl = 'http://localhost:8085/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }

  saveAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account);
  }

  updateAccount(id: number, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/${id}`, account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
