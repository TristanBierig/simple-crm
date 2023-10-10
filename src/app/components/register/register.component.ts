import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
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

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],

  });

  register() {
    this.authService
      .createNewAccount({
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
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
          const errorMsg =
            'Account successfully created. You can now log in with your credentials!';
          this.isLoading = false;
          this.snackBar.open(errorMsg, 'OK', { duration: 5000 });
        },
      });
  }
}
