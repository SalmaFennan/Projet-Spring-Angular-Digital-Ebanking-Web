import { Routes } from '@angular/router';
import {AccountsComponent} from './accounts/accounts.component';
import {CustomersComponent} from './customers/customers.component';

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'accounts', component: AccountsComponent },
];
