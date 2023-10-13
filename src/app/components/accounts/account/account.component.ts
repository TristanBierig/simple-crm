import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { AccountEditDialogComponent } from '../account-edit-dialog/account-edit-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  currentUserId!: string | undefined;
  currentUser!: any;

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog
  ) {
    this.setCurrentUser();
  }

  setCurrentUser() {
    setTimeout(() => {
      console.log(this.authService.currentUserId);
    }, 1000);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  openDialog(): void {
    this.dialog.open(AccountEditDialogComponent, {
      data: this.currentUser,
    });
  }
}
