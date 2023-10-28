import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.class';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUserId!: string;
  currentUser!: Employee;
  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private fireService: FirestoreService
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

  greetings(): string {
    let now = new Date().getHours();
    if (now < 12) {
      return 'Good morning';
    } else if (now > 12 && now < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }
}
