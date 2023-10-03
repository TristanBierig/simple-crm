import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  user,
  User,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedIn: boolean = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: any;

  currentUser: any;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
      this.currentUser = aUser;
    });
  }

  signIn(params: SignIn): Observable<any> {
    return from(
      signInWithEmailAndPassword(this.auth, params.email, params.password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('Erfolgreich eingeloggt: ', user);

          this.isLoggedIn = true;
          this.isLoggedInSubject.next(this.isLoggedIn);
        }
      )
    );
  }

  signOut() {
    signOut(this.auth).then(() => {
    });
  }
}

type SignIn = {
  email: string;
  password: string;
};
