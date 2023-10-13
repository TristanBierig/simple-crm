import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.class';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent {
  user: User;
  userId: string;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { content: User; docRef: string },
    private fireService: FirestoreService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>
  ) {
    this.user = new User(data.content);
    this.userId = data.docRef;
  }

  updateInfo() {
    this.fireService.updateDoc(this.user, this.userId);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
