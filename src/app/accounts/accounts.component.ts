import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Account} from '../model/account.model';
import {AccountService} from '../services/account.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-accounts',
  imports: [
    AsyncPipe
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accounts$: Observable<Account[]> | undefined;
  errorMessage = '';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accounts$ = this.accountService.getAccounts();
  }

  deleteAccount(id: number) {
    this.accountService.deleteAccount(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error(err)
    });
  }
}
