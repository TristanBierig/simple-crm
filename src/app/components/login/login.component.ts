import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnimationDurations } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading: boolean = false;

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    this.isLoading = true;
    // Timeout just to have time for the loading animation to run
    // setTimeout(() => {
    this.authService
      .signIn({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
      .subscribe({
        next: () => {},
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open(err.message, 'OK', { duration: 5000 });
          console.log('Error from component: ', err.message);
        },
        complete: () => {
          this.router.navigate(['dashboard']);
        },
      });
    // }, 1500);
  }

  getEmailErrorMsg(): string {
    if (this.loginForm.get('email')!.errors?.['required']) {
      const errMsg = 'Please enter an email!';
      return errMsg;
    }
    const errMsg = 'Please enter a valid email address!';
    return errMsg;
  }

  getPasswordErrorMsg(): string {
    if (this.loginForm.get('password')!.errors?.['required']) {
      const errMsg = 'Please enter your password!';
      return errMsg;
    }
    const errMsg = 'Password needs to be at least 6 characters!';
    return errMsg;
  }
}
