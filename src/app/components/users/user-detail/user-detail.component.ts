import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.class';
import { UserService } from 'src/app/services/firebase/user.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditUserPersonalComponent } from '../dialog-edit-user-personal/dialog-edit-user-personal.component';
import { DialogEditUserProjectsComponent } from '../dialog-edit-user-projects/dialog-edit-user-projects.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userDetail: User = new User();

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.userDetail = new User(this.userService.currentUserDetail);
  }

  openMainEdit() {
    this.dialog.open(DialogEditUserComponent, {
      data: this.userDetail,
    });
  }

  openPersonalEdit() {
    this.dialog.open(DialogEditUserPersonalComponent, {
      data: this.userDetail,
    });
  }

  openProjectsEdit() {
    this.dialog.open(DialogEditUserProjectsComponent, {
      data: this.userDetail,
    });
  }
}
