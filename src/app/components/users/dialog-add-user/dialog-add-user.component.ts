import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { UserService } from '../../../services/firebase/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate!: Date;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserService
  ) {}

  async addUser() {
    this.loading = true;
    let user: User = {
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      email: this.user.email || '',
      birthDate: this.birthDate.toLocaleString('de-DE', {
        weekday: undefined,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      street: this.user.street || '',
      zipCode: this.user.zipCode,
      city: this.user.city || '',
    };
    await this.userService.addUser(user);
    this.loading = false;
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
