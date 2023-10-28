import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.class';
import { Subject, takeUntil } from 'rxjs';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      {
        data: [651, 59, 280, 81, 56, 55, 40],
        label: 'success',
        backgroundColor: '#009788',
      },
      {
        data: [28, 48, 401, 19, 86, 27, 90],
        label: 'pending',
        backgroundColor: '#a376cb',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 94],
        label: 'lost',
        backgroundColor: '#f5393b',
      },
    ],
  };

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
    this.setChartData();
  }

  setCurrentUser() {
    this.fireService.startSubSingleEmployee(this.currentUserId);
    this.fireService.singleEmployee$
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe((employee) => {
        this.currentUser = employee;
      });
  }

  setChartData() {}

  deleteTodo(i: number) {
    this.currentUser.todos.splice(i, 1);
  }

  ngOnDestroy() {
    this.fireService.unsubSingleEmployee();
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  openDialog() {
    this.dialog.open(AddTodoDialogComponent, {
      data: this.currentUser,
    });
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
