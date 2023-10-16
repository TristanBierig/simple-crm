export class Customer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  street: string;
  zipCode: number;
  city: string;
  leadStatus: 'lost' | 'pending' | 'fullfilled';
  leadOwner: string;
  leadStartDate: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
    this.leadStatus = obj ? obj.leadStatus : '';
    this.leadOwner = obj ? obj.leadOwner : '';
    this.leadStartDate = obj ? obj.leadStartDate : '';
  }
}
