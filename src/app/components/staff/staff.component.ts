import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from 'src/app/models/employee.class';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  employeeList!: Employee[];

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(private fireService: FirestoreService) {}

  ngOnInit(): void {
    this.loadEmployeeList();
    console.log(this.employeeList);
  }

  loadEmployeeList() {
    this.fireService.startSubEmployeeList();
    this.fireService.employees$
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe((employee) => {
        this.employeeList = employee;
      });
  }
}
