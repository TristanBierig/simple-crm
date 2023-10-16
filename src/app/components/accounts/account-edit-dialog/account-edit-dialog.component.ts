import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from 'src/app/models/employee.class';
import { DialogDataService } from 'src/app/services/api/dialog-data.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-account-edit-dialog',
  templateUrl: './account-edit-dialog.component.html',
  styleUrls: ['./account-edit-dialog.component.scss'],
})
export class AccountEditDialogComponent implements OnInit {
  genders: string[] = ['Male', 'Female', 'Other'];
  roles: string[] = ['Sales', 'Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Marketing', 'HR'];
  regions: string[] = [];
  timezones: string[] = [];

  selectedRegion!: string;
  selectedGender!: string;
  selectedTimezone!: string;
  selectedRole!: string;

  employee: Employee;

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private ApiService: DialogDataService,
    private fireService: FirestoreService,
    public dialogRef: MatDialogRef<AccountEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employee = data;
    this.selectedRegion = data.region;
    this.selectedGender = data.gender;
    this.selectedRole = data.role;
  }

  ngOnInit(): void {
    this.fetchCountries();
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  fetchCountries() {
    this.ApiService.getCountries()
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe((countries: any) => {
        countries.forEach((element: any) => {
          let country = element.name.common;
          this.regions.push(country);
        });
      });
  }

  updateInfo() {
    this.employee.region = this.selectedRegion;
    this.employee.gender = this.selectedGender;
    this.employee.role = this.selectedRole;
    this.checkForCompleteInfo();
    this.fireService.updateDoc(this.employee, this.employee.id);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  checkForCompleteInfo() {
    const emp = this.employee;
    if (
      emp.firstName &&
      emp.lastName &&
      emp.displayName &&
      emp.gender &&
      emp.language &&
      emp.region &&
      emp.role
    ) {
      this.employee.completeInfo = true;
    } else {
      this.employee.completeInfo = false;
    }
  }
}
