import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.class';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-dialog-edit-customer-personal',
  templateUrl: './dialog-edit-customer-personal.component.html',
  styleUrls: ['./dialog-edit-customer-personal.component.scss'],
})
export class DialogEditCustomerPersonalComponent {
  customer: Customer;
  customerId: string;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { content: Customer; docRef: string },
    private fireService: FirestoreService,
    public dialogRef: MatDialogRef<DialogEditCustomerPersonalComponent>
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
