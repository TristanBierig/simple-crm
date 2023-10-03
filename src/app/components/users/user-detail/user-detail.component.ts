import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.class';
import { UserService } from 'src/app/services/firebase/user.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditUserPersonalComponent } from '../dialog-edit-user-personal/dialog-edit-user-personal.component';
import { DialogEditUserProjectsComponent } from '../dialog-edit-user-projects/dialog-edit-user-projects.component';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userDetail!: User;
  userId!: string;

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cacheUserId();
    this.userService.startSubSingle(this.userId);
    this.userService.singleUser$.pipe(takeUntil(this.componentIsDestroyed$)).subscribe((user) => {
      this.userDetail = user;
    });
  }

  ngOnDestroy() {
    this.userService.unsubSingleUser();
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  cacheUserId() {
    let currentId = this.route.snapshot.paramMap.get('id');
    if (currentId) {
      this.userId = currentId;
      console.log('New User ID: ', this.userId);
    }
  }

  getSingleUser(): User {
    return this.userService.singleUser;
  }

  openMainEdit() {
    this.dialog.open(DialogEditUserComponent, {
      data: { content: this.userDetail, docRef: this.userId },
    });
  }

  openPersonalEdit() {
    this.dialog.open(DialogEditUserPersonalComponent, {
      data: { content: this.userDetail, docRef: this.userId },
    });
  }

  openProjectsEdit() {
    this.dialog.open(DialogEditUserProjectsComponent, {
      data: { content: this.userDetail, docRef: this.userId },
    });
  }
}
