import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe,ReactiveFormsModule],
  providers: [CustomerService],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined ;

  constructor(private customerService: CustomerService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({keyword:this.fb.control("")});
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => new Error(err.message));  // ✅ Correction ici
      })
    );
  }

  handleSearchCustomers() {
  let kw=this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => new Error(err.message));
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    this.customerService.deleteCustomers(c.id).subscribe({
      next:(resp)=>{
        this.handleSearchCustomers();},
    error:err=>{
        console.log(err)
        }
        })
  }
}
