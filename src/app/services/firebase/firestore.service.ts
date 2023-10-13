import { Injectable, inject } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { BehaviorSubject } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  limit,
} from '@angular/fire/firestore';
import { Unsubscribe } from '@angular/fire/auth';
import { Employee } from 'src/app/models/employee.class';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  singleUser!: any;
  private singleUserSubject = new BehaviorSubject<User>(this.singleUser);
  singleUser$ = this.singleUserSubject.asObservable();

  unsubUsers: Unsubscribe;
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

  async setDoc(uid: string, employee: Employee) {
    await setDoc(doc(this.getEmployeesRef(), uid), this.getCleanJson(employee));
  }

  async updateUser(user: User, docId: string) {
    await updateDoc(
      this.getSingleDocRef('users', docId),
      this.getCleanJson(user)
    );
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
      this.singleUserSubject.next(this.singleUser);
    });
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getEmployeesRef() {
    return collection(this.firestore, 'employees');
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

  getCleanJson(data: User | Employee): {} {
    if (data instanceof User) {
      return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthDate: data.birthDate,
        street: data.street,
        zipCode: data.zipCode,
        city: data.city,
      };
    } else {
      return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        language: data.language,
        email: data.email,
        birthDate: data.birthDate,
        street: data.street,
        zipCode: data.zipCode,
        city: data.city,
      };
    }
  }
}
