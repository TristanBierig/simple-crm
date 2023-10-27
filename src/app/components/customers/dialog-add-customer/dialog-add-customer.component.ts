import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer.class';
import { FirestoreService } from '../../../services/firebase/firestore.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.class';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss'],
})
export class DialogAddCustomerComponent {
  customer: Customer = new Customer();
  birthDate!: Date;
  loading: boolean = false;
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<DialogAddCustomerComponent>,
    private fireService: FirestoreService
  ) {
    this.employee = this.fireService.singleEmployee;
  }

  async addCustomer() {
    this.loading = true;
    let customer: Customer = {
      firstName: this.customer.firstName || '',
      lastName: this.customer.lastName || '',
      email: this.customer.email || '',
      birthDate: this.birthDate.toLocaleString('de-DE', {
        weekday: undefined,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      street: this.customer.street || '',
      zipCode: this.customer.zipCode,
      city: this.customer.city || '',
      leadInfo: {
        leadOwner: this.employee.displayName || '',
        leadStartDate: new Date().toLocaleString('de-DE', {
          weekday: undefined,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) || '',
        leadStatus: 'pending' || '',
        leadValue: this.customer.leadInfo.leadValue,
        leadTitle: this.customer.leadInfo.leadTitle,
      },
    };
    await this.fireService.addCustomer(customer);
    this.loading = false;
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
