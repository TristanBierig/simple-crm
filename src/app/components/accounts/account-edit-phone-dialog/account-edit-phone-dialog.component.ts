import { Component, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee.class';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { AccountEditEmailDialogComponent } from '../account-edit-email-dialog/account-edit-email-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-account-edit-phone-dialog',
  templateUrl: './account-edit-phone-dialog.component.html',
  styleUrls: ['./account-edit-phone-dialog.component.scss'],
})
export class AccountEditPhoneDialogComponent {
  employee: Employee;

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private fireService: FirestoreService,
    public dialogRef: MatDialogRef<AccountEditEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employee = data;
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  updateInfo() {
    this.fireService.updateDoc(this.employee, this.employee.id);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
