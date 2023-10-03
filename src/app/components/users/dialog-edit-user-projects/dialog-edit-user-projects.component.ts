import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.class';
import { UserService } from 'src/app/services/firebase/user.service';

@Component({
  selector: 'app-dialog-edit-user-projects',
  templateUrl: './dialog-edit-user-projects.component.html',
  styleUrls: ['./dialog-edit-user-projects.component.scss'],
})
export class DialogEditUserProjectsComponent {
  user: User = new User();
  loading: boolean = false;

  assignment!: string;
  projects: any[] = [
    { value: 'daWebsite-0', viewValue: 'DA-Website v3.0' },
    { value: 'projectX-1', viewValue: 'Project-X v1.2' },
    { value: 'backoffice-2', viewValue: "Start-up's Backoffice" },
  ];

  role!: string;
  roles: any[] = [
    { value: 'marketing-0', viewValue: 'Marketing' },
    { value: 'frontend-1', viewValue: 'Frontend Developer' },
    { value: 'backend-2', viewValue: 'Backend Developer' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogEditUserProjectsComponent>
  ) {
    this.user = data;
  }

  updateInfo() {
    // this.userService.updateUser(this.user);
    // this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
