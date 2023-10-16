import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { MaterialModule } from './custom-modules/material.module';

import { CustomerComponent } from './components/customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customers/customer-detail/customer-detail.component';
import { DialogAddCustomerComponent } from './components/customers/dialog-add-customer/dialog-add-customer.component';
import { DialogEditCustomerComponent } from './components/customers/dialog-edit-customer/dialog-edit-customer.component';
import { DialogEditCustomerPersonalComponent } from './components/customers/dialog-edit-customer-personal/dialog-edit-customer-personal.component';
import { DialogEditCustomerProjectsComponent } from './components/customers/dialog-edit-customer-projects/dialog-edit-customer-projects.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { StaffComponent } from './components/staff/staff.component';

import { AccountComponent } from './components/accounts/account/account.component';
import { AccountEditDialogComponent } from './components/accounts/account-edit-dialog/account-edit-dialog.component';
import { AccountEditEmailDialogComponent } from './components/accounts/account-edit-email-dialog/account-edit-email-dialog.component';
import { AccountEditPhoneDialogComponent } from './components/accounts/account-edit-phone-dialog/account-edit-phone-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomerComponent,
    DialogAddCustomerComponent,
    CustomerDetailComponent,
    DialogEditCustomerComponent,
    DialogEditCustomerProjectsComponent,
    DialogEditCustomerPersonalComponent,
    LoginComponent,
    RegisterComponent,
    StaffComponent,
    AccountComponent,
    AccountEditDialogComponent,
    AccountEditEmailDialogComponent,
    AccountEditPhoneDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
