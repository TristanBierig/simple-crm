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

  constructor(obj?: any) {
    this.id = obj ? obj.uid : '';
    this.gender = '';
    this.language = '';
    this.firstName = '';
    this.lastName = '';
    this.email = obj ? obj.email : '';
    this.birthDate = '';
    this.street = '';
    this.zipCode = 12345;
    this.city = '';
    this.firstLogin = true;
  }
}
