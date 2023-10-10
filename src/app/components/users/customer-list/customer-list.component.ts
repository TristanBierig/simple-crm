import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/app/models/user.class';
import { FirestoreService } from '../../../services/firebase/firestore.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerComponent implements AfterViewInit {
  users!: User[];
  displayedColumns: string[] = ['name', 'email', 'birthday', 'street', 'city'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  constructor(
    private fireService: FirestoreService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.fireService.users$.subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }

  getList(): User[] {
    return this.fireService.users;
  }
}
