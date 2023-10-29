import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.class';
import { Subject, takeUntil } from 'rxjs';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AuthenticationService } from 'src/app/services/firebase/authentication.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';
import { Customer } from 'src/app/models/customer.class';

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
    labels: ['2023',],
    datasets: [
      {
        data: [],
        label: 'success',
        backgroundColor: '#009788',
      },
      {
        data: [],
        label: 'pending',
        backgroundColor: '#a376cb',
      },
      {
        data: [],
        label: 'lost',
        backgroundColor: '#f5393b',
      },
    ],
  };

  currentUserId!: string;
  currentUser!: Employee;

  leadSuccess: number[] = [];
  leadPending: number[] = [];
  leadLost: number[] = [];

  leadSuccessSum!: number;
  leadPendingSum!: number;
  leadLostSum!: number;

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private fireService: FirestoreService,
    public dialog: MatDialog
  ) {
    this.setChartData();
  }

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

  setChartData() {
    this.fireService.customers$
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe((customers) => {
        customers.forEach((customer) => {
          switch (customer.leadInfo.leadStatus) {
            case 'success':
              this.leadSuccess.push(customer.leadInfo.leadValue);
              break;
            case 'pending':
              this.leadPending.push(customer.leadInfo.leadValue);
              break;
            case 'lost':
              this.leadLost.push(customer.leadInfo.leadValue);
              break;

            default:
              break;
          }
        });
        this.sumSingleLeads();
      });
  }

  sumSingleLeads() {
    this.leadSuccessSum = this.leadSuccess.reduce((a, b) => a + b, 0);
    this.leadPendingSum = this.leadPending.reduce((a, b) => a + b, 0);
    this.leadLostSum = this.leadLost.reduce((a, b) => a + b, 0);
    this.setSingleNumbersForChartData();
  }

  setSingleNumbersForChartData() {
    this.barChartData.datasets[0].data.push(this.leadSuccessSum);
    this.barChartData.datasets[1].data.push(this.leadPendingSum);
    this.barChartData.datasets[2].data.push(this.leadLostSum);
  }

  deleteTodo(i: number) {
    this.currentUser.todos.splice(i, 1);
    this.fireService.updateDoc(this.currentUser, this.currentUserId);
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
