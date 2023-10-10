import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './components/users/customer-list/customer-list.component';
import { DialogAddUserComponent } from './components/users/dialog-add-user/dialog-add-user.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { MaterialModule } from './custom-modules/material.module';

import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { DialogEditUserComponent } from './components/users/dialog-edit-user/dialog-edit-user.component';
import { DialogEditUserPersonalComponent } from './components/users/dialog-edit-user-personal/dialog-edit-user-personal.component';
import { DialogEditUserProjectsComponent } from './components/users/dialog-edit-user-projects/dialog-edit-user-projects.component';
import { LoginComponent } from './components/login/login.component';


import { RegisterComponent } from './components/register/register.component';
import { StaffComponent } from './components/staff/staff.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomerComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditUserComponent,
    DialogEditUserProjectsComponent,
    DialogEditUserPersonalComponent,
    LoginComponent,
    RegisterComponent,
    StaffComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
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
