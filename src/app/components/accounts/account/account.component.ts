import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { AccountEditDialogComponent } from '../account-edit-dialog/account-edit-dialog.component';
import { Employee } from 'src/app/models/employee.class';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  currentUserId!: string;
  currentUser!: Employee;

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private fireService: FirestoreService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.currentUserId;
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.fireService.startSubSingleEmployee(this.currentUserId);
    this.fireService.singleEmployee$
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe((employee) => {
        this.currentUser = employee;
      });
  }

  ngOnDestroy() {
    this.fireService.unsubSingleEmployee();
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  openDialog(): void {
    this.dialog.open(AccountEditDialogComponent, {
      data: this.currentUser,
    });
  }
}
