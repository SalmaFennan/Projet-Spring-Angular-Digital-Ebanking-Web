import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountsService} from '../services/account.service';

@Component({
  selector: 'app-new-account',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css'
})
export class NewAccountComponent {

  public accountForm!: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountsService) {}

  ngOnInit() {
    this.accountForm = this.fb.group({
      type: ['CURRENT'],
      balance: [0],
      currency: ['MAD'],
      overdraft: [0],
      interestRate: [0],
      customerId: [null]
    });
  }

  saveAccount() {
    if (this.accountForm.invalid) {
      return;
    }

    const data = this.accountForm.value;
    this.accountService.saveAccount(data).subscribe({
      next: () => {
        alert("Account saved successfully!");
        this.accountForm.reset({
          type: 'CURRENT',
          balance: 0,
          currency: 'MAD',
          overdraft: 0,
          interestRate: 0
        });
      },
      error: (err: any) => {  // Correction du typage
        console.error("Error saving account:", err);
        alert("Error saving account: " + err.message);
      }
    });
  }
}
