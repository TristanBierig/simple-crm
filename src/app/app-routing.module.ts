import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './components/customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customers/customer-detail/customer-detail.component';
import { LoginComponent } from './components/login/login.component';
import { StaffComponent } from './components/staff/staff.component';
import { AccountComponent } from './components/accounts/account/account.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent, outlet: 'login' },
  { path: 'register', component: RegisterComponent, outlet: 'login' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'account', component: AccountComponent },
  { path: 'customer/:id', component: CustomerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
