import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.class';
import { Subject } from 'rxjs';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-account-edit-email-dialog',
  templateUrl: './account-edit-email-dialog.component.html',
  styleUrls: ['./account-edit-email-dialog.component.scss'],
})
export class AccountEditEmailDialogComponent {
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
