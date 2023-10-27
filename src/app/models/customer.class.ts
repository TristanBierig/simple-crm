export class Customer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  birthDate: {};
  street: string;
  zipCode: number;
  city: string;
  leadInfo: {
    leadStatus: 'lost' | 'pending' | 'success';
    leadOwner: string;
    leadValue: string;
    leadStartDate: string;
    leadTitle: string;
  };
  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.phone = obj ? obj.phone : null;
    this.birthDate = obj ? obj.birthDate : {};
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
    this.leadInfo = {
      leadStatus: obj ? obj.leadInfo.leadStatus : '',
      leadOwner: obj ? obj.leadInfo.leadOwner : '',
      leadStartDate: obj ? obj.leadInfo.leadStartDate : '',
      leadValue: obj ? obj.leadInfo.leadValue : '',
      leadTitle: obj ? obj.leadInfo.leadTitle : '',
    };
  }
}
