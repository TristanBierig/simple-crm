import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  currentUser!: any;
  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(private authService: AuthenticationService) {
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
