export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  language: string;
  email: string;
  birthDate: string;
  street: string;
  zipCode: number;
  city: string;
  firstLogin: boolean;

  constructor(auth?: any, info?: any) {
    this.id = auth ? auth.uid : '';
    this.gender = '';
    this.language = '';
    this.firstName = info ? info.firstName : '';
    this.lastName = info ? info.lastName : '';
    this.email = auth ? auth.email : '';
    this.birthDate = '';
    this.street = '';
    this.zipCode = 12345;
    this.city = '';
    this.firstLogin = true;
  }
}
