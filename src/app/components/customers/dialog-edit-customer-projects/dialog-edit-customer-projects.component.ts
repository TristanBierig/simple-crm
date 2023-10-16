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

  assignment!: string;
  projects: any[] = [
    { value: 'daWebsite-0', viewValue: 'DA-Website v3.0' },
    { value: 'projectX-1', viewValue: 'Project-X v1.2' },
    { value: 'backoffice-2', viewValue: "Start-up's Backoffice" },
  ];

  role!: string;
  roles: any[] = [
    { value: 'marketing-0', viewValue: 'Marketing' },
    { value: 'frontend-1', viewValue: 'Frontend Developer' },
    { value: 'backend-2', viewValue: 'Backend Developer' },
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
    this.fireService.updateDoc(this.customer, this.customer.id!);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
