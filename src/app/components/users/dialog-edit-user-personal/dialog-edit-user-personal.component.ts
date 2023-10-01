import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.class';
import { UserService } from 'src/app/services/firebase/user.service';

@Component({
  selector: 'app-dialog-edit-user-personal',
  templateUrl: './dialog-edit-user-personal.component.html',
  styleUrls: ['./dialog-edit-user-personal.component.scss'],
})
export class DialogEditUserPersonalComponent {
  user: User = new User();
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogEditUserPersonalComponent>
  ) {
    this.user = data;
  }

  updateInfo() {
    // this.userService.updateUser(this.user);
    // this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
