import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.class';

@Component({
  selector: 'app-dialog-edit-user-projects',
  templateUrl: './dialog-edit-user-projects.component.html',
  styleUrls: ['./dialog-edit-user-projects.component.scss'],
})
export class DialogEditUserProjectsComponent {
  user: User = new User();
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {
    this.user = data;
  }
}
