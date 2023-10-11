import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-account-edit-dialog',
  templateUrl: './account-edit-dialog.component.html',
  styleUrls: ['./account-edit-dialog.component.scss'],
})
export class AccountEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AccountEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
