import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    HttpClientModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers! : Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup : FormGroup | undefined;
  constructor(private customerService : CustomerService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchCustomers();
  }
  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        this.errorMessage = err.message;
        return throwError(() => err);
      })
    );
  }
  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if (!conf) return;

    this.customerService.deleteCustomers(c.id).subscribe({
      next: () => {
        this.customers = this.customers.pipe(
          map(data => data.filter(item => item.id !== c.id))
        );
      },
      error: err => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        console.error(err);
      }
    });
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state :customer});
  }
}
