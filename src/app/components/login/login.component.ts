import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  getEmailErrorMsg(): string {
    if (this.loginForm.get('email')!.errors?.['required']) {
      const errMsg = 'Please enter an email';
      return errMsg;
    }
    const errMsg = 'Please enter a valid email address';
    return errMsg;
  }
}
