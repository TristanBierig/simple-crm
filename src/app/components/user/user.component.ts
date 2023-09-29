import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/app/models/user.class';
import { UserService } from '../../services/firebase-services/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  users!: User[];
  displayedColumns: string[] = ['name', 'birthday', 'street', 'city'];
  dataSource = this.userService.users;

  constructor(private userService: UserService, public dialog: MatDialog) {
    console.log('Component Constructor: ', this.dataSource);
  }

  ngOnInit() {
    console.log('Component ngOnInit: ', this.dataSource);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }

  getList(): User[] {
    return this.userService.users;
  }
}
