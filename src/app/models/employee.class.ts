export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  language: string;
  region: string;
  email: string;
  phone: string;
  birthDate: string;
  timeZone!: string;
  street: string;
  zipCode: number;
  city: string;
  completeInfo: boolean;
  displayName: string;

  constructor(auth?: any, info?: any) {
    this.id = auth ? auth.uid : '';
    this.gender = '';
    this.language = '';
    this.region = '';
    this.phone = '';
    this.firstName = info ? info.firstName : '';
    this.lastName = info ? info.lastName : '';
    this.email = auth ? auth.email : '';
    this.birthDate = '';
    this.street = '';
    this.city = '';
    this.zipCode = 12345;
    this.displayName = info ? info.firstName : '';
    this.completeInfo = true;
    this.setTimezone();
  }

  setTimezone() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const hrs = -(new Date().getTimezoneOffset() / 60);
    this.timeZone = `${timezone} +${hrs}:00`;
  }
}
