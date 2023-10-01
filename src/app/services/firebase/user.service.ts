import { Injectable, inject } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { BehaviorSubject } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  limit,
} from '@angular/fire/firestore';
import { Unsubscribe } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);

  users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  singleUser!: any;

  unsubUsers;
  unsubSingleUser!: Unsubscribe;

  constructor() {
    this.unsubUsers = this.subUsers();
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

  async addUser(user: User) {
    await addDoc(this.getUsersRef(), user)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document created with ID: ', docRef?.id);
      });
  }

  startSubSingle(docId: string) {
    console.log(docId);
    this.unsubSingleUser = this.subSingleUser(docId);
  }

  subUsers() {
    const q = query(this.getUsersRef(), limit(100));
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach((element) => {
        this.users.push(this.setUserObject(element.data(), element.id));
      });

      this.usersSubject.next(this.users);
    });
  }

  subSingleUser(docId: string) {
    return onSnapshot(this.getSingleDocRef('users', docId), (user) => {
      this.singleUser = user.data();
      console.log(this.singleUser);
    });
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setUserObject(obj: any, docId: string): User {
    return {
      id: docId,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    };
  }

  getCleanJson(user: User): {} {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
    };
  }
}
