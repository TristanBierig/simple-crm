import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.class';
import { UserService } from 'src/app/services/firebase/user.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditUserPersonalComponent } from '../dialog-edit-user-personal/dialog-edit-user-personal.component';
import { DialogEditUserProjectsComponent } from '../dialog-edit-user-projects/dialog-edit-user-projects.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userDetail!: User;
  userId!: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cacheUserId();
    this.userService.startSubSingle(this.userId);
    this.userDetail = this.getSingleUser();
  }

  cacheUserId() {
    this.userId = '';
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      console.log('New User ID: ', this.userId);   
    }
  }

  getSingleUser(): User {
    return this.userService.singleUser;
  }

  ngOnDestroy() {
    this.userService.unsubSingleUser();
  }

  openMainEdit() {
    // this.dialog.open(DialogEditUserComponent, {
    //   data: this.userDetail,
    // });
  }

  openPersonalEdit() {
    // this.dialog.open(DialogEditUserPersonalComponent, {
    //   data: this.userDetail,
    // });
  }

  openProjectsEdit() {
    // this.dialog.open(DialogEditUserProjectsComponent, {
    //   data: this.userDetail,
    // });
  }
}
