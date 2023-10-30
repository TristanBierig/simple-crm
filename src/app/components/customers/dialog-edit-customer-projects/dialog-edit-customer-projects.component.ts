import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.class';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-dialog-edit-customer-projects',
  templateUrl: './dialog-edit-customer-projects.component.html',
  styleUrls: ['./dialog-edit-customer-projects.component.scss'],
})
export class DialogEditCustomerProjectsComponent {
  customer: Customer;
  customerId: string;
  loading: boolean = false;
  status: any[] = [
    { value: 'lost', viewValue: 'lost' },
    { value: 'pending', viewValue: 'pending' },
    { value: 'success', viewValue: 'success' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { content: Customer; docRef: string },
    private fireService: FirestoreService,
    public dialogRef: MatDialogRef<DialogEditCustomerProjectsComponent>
  ) {
    this.customer = new Customer(data.content);
    this.customerId = data.docRef;
  }

  updateInfo() {
    this.fireService.updateDoc(this.customer, this.customerId);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
