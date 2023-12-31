import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading: boolean = false;
  isRecoveringPassword: boolean = false;
  public ishiddenPw: boolean = true;

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
    setTimeout(() => {
      this.authService
        .signIn({
          email: this.loginForm.value.email!,
          password: this.loginForm.value.password!,
        })
        .subscribe({
          error: () => {
            const errorMsg =
              'There was an error with your E-Mail/Password combination. Please try again.';
            this.isLoading = false;
            this.snackBar.open(errorMsg, 'OK', { duration: 5000 });
          },
          complete: () => {
            this.router.navigate(['dashboard']);
          },
        });
    }, 1000);
  }

  guestLogin() {
    this.isLoading = true;
    // Timeout just to have time for the loading animation to run
    setTimeout(() => {
      this.authService
        .signIn({
          email: 'guest@user.com',
          password: '123456',
        })
        .subscribe({
          error: () => {
            const errorMsg =
              'There was an error with your E-Mail/Password combination. Please try again.';
            this.isLoading = false;
            this.snackBar.open(errorMsg, 'OK', { duration: 5000 });
          },
          complete: () => {
            this.router.navigate(['dashboard']);
          },
        });
    }, 1000);
  }

  recoverPassword() {
    this.isRecoveringPassword = true;
    this.authService.recoverPassword(this.loginForm.value.email!).subscribe({
      error: () => {
        const errorMsg =
          'There was an error with the given email. Please try again!';
        this.isRecoveringPassword = false;
        this.snackBar.open(errorMsg, 'OK', { duration: 5000 });
      },
      complete: () => {
        const errorMsg =
          'We sent you an email! Follow the link to reset your Password.';
        this.isRecoveringPassword = false;
        this.snackBar.open(errorMsg, 'OK', { duration: 5000 });
      },
    });
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
