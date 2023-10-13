import { Injectable, inject, OnInit } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  user,
  User,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Employee } from 'src/app/models/employee.class';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  isLoggedIn: boolean = false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  currentUserId: any;

  constructor(private fireService: FirestoreService) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.currentUserId = uid;
        this.fireService.startSubSingleEmployee(this.currentUserId);
        console.log('Logged in as: ', user);
      } else {
        // User is signed out
        console.log('Logged out user: ', user);
      }
    });
  }

  ngOnInit(): void {}

  createNewAccount(params: any): Observable<any> {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        params.email,
        params.password
      ).then((cred) => {
        const employee = new Employee(cred.user, params);
        const uid = cred.user.uid;
        this.fireService.setDoc(uid, employee);
      })
    );
  }

  signIn(params: SignIn): Observable<any> {
    return from(
      signInWithEmailAndPassword(this.auth, params.email, params.password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.isLoggedIn = true;
          this.isLoggedInSubject.next(this.isLoggedIn);
        }
      )
    );
  }

  signOut() {
    signOut(this.auth);
  }

  recoverPassword(email: string): Observable<void> {
    return from(
      sendPasswordResetEmail(this.auth, email).then(() => {
        console.log('reset emnail has been send');
      })
    );
  }
}

type SignIn = {
  email: string;
  password: string;
};
