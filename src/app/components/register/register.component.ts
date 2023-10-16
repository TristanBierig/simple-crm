import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading: boolean = false;
  public ishiddenPw: boolean = true;

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    this.authService
      .createNewAccount({
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        firstName: this.registerForm.value.firstName!,
        lastName: this.registerForm.value.lastName!,
      })
      .subscribe({
        error: () => {
          const errorMsg =
            'There was an error with your registration. Please try again later.';
          this.isLoading = false;
          this.snackBar.open(errorMsg, 'OK', { duration: 5000 });
        },
        complete: () => {
          this.router.navigate(['/']);
          const successMsg =
            'Account successfully created. You can now log in with your credentials!';
          this.isLoading = false;
          this.snackBar.open(successMsg, 'OK', { duration: 5000 });
        },
      });
  }

  getNameErrMsg() {
    return 'Please enter a name';
  }

  getEmailErrMsgRequired() {
    return 'Email is required';
  }

  getEmailErrMsgFormat() {
    return 'Please enter a valid email address';
  }

  getPasswordErrMsg() {
    return 'Password needs to be at least 6 Characters'
  }
}
