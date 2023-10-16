import { Injectable, inject } from '@angular/core';
import { Customer } from 'src/app/models/customer.class';
import { BehaviorSubject } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
  updateDoc,
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

  customers: Customer[] = [];
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();

  employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  singleCustomer!: any;
  private singleCustomerSubject = new BehaviorSubject<Customer>(this.singleCustomer);
  singleCustomer$ = this.singleCustomerSubject.asObservable();

  singleEmployee!: any;
  private singleEmployeeSubject = new BehaviorSubject<Employee>(
    this.singleEmployee
  );
  singleEmployee$ = this.singleEmployeeSubject.asObservable();

  unsubCustomers: Unsubscribe;
  unsubEmployees!: Unsubscribe;
  unsubSingleCustomer!: Unsubscribe;
  unsubSingleEmployee!: Unsubscribe;

  constructor() {
    this.unsubCustomers = this.subCollection('customers');
  }

  ngOnDestroy() {
    this.unsubCustomers();
  }

  async addCustomer(user: Customer) {
    await addDoc(this.getCustomersRef(), user)
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

  async updateDoc(payload: Customer | Employee, docId: string) {
    if (payload instanceof Customer) {
      await updateDoc(
        this.getSingleDocRef('customers', docId),
        this.getCleanJson(payload)
      );
    } else {
      await updateDoc(
        this.getSingleDocRef('employees', docId),
        this.getCleanJson(payload)
      );
    }
  }

  startSubSingle(docId: string) {
    this.unsubSingleCustomer = this.subSingleCustomer(docId);
  }

  startSubSingleEmployee(docId: string) {
    this.unsubSingleEmployee = this.subSingleEmployee(docId);
  }

  startSubEmployeeList() {
    this.unsubEmployees = this.subCollection('employee');
  }

  subCollection(target: string) {
    if (target == 'customers') {
      const q = query(this.getCustomersRef(), limit(100));
      return onSnapshot(q, (list) => {
        this.customers = [];
        list.forEach((element) => {
          this.customers.push(this.setCustomerObject(element.data(), element.id));
        });

        this.customersSubject.next(this.customers);
      });
    } else {
      const q = query(this.getEmployeesRef(), limit(100));
      return onSnapshot(q, (list) => {
        this.employees = [];
        list.forEach((element) => {
          this.employees.push(this.setEmployeeObject(element.data()));
        });
        this.employeesSubject.next(this.employees);
      });
    }
  }

  subSingleCustomer(docId: string) {
    return onSnapshot(this.getSingleDocRef('customers', docId), (customer) => {
      this.singleCustomer = customer.data();
      console.log(this.singleCustomer);
      this.singleCustomerSubject.next(this.singleCustomer);
    });
  }

  subSingleEmployee(docId: string) {
    return onSnapshot(this.getSingleDocRef('employees', docId), (employee) => {
      this.singleEmployee = employee.data();
      console.log('Snapshot from Service for data: ', this.singleEmployee);
      this.singleEmployeeSubject.next(this.singleEmployee);
    });
  }

  getCustomersRef() {
    return collection(this.firestore, 'customers');
  }

  getEmployeesRef() {
    return collection(this.firestore, 'employees');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setCustomerObject(obj: any, docId: string): Customer {
    return {
      id: docId,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || 0,
      city: obj.city || '',
    };
  }

  setEmployeeObject(obj: any): any {
    return {
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      gender: obj.gender,
      language: obj.language,
      email: obj.email,
      phone: obj.phone,
      region: obj.region,
      timeZone: obj.timeZone || '',
      birthDate: obj.birthDate,
      street: obj.street,
      zipCode: obj.zipCode,
      city: obj.city,
      completeInfo: obj.completeInfo,
      displayName: obj.displayName,
    };
  }

  getCleanJson(data: Customer | Employee): {} {
    if (data instanceof Customer) {
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
        phone: data.phone,
        region: data.region,
        timeZone: data.timeZone,
        birthDate: data.birthDate,
        street: data.street,
        zipCode: data.zipCode,
        city: data.city,
        completeInfo: data.completeInfo,
        displayName: data.displayName,
      };
    }
  }
}
