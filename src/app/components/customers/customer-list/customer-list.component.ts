import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { Customer } from 'src/app/models/customer.class';
import { FirestoreService } from '../../../services/firebase/firestore.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerComponent implements AfterViewInit {
  customers!: Customer[];
  displayedColumns: string[] = ['firstName', 'email', 'leadInfo.leadOwner', 'leadInfo.leadValue', 'leadInfo.leadStatus'];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>(
    []
  );

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private fireService: FirestoreService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    console.log(this.fireService.customers$);
    
    this.fireService.customers$
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe((customers) => {
        
        this.dataSource.data = customers;
        this.dataSource.sortingDataAccessor = this.pathDataAccessor;
        console.log(this.dataSource);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  applyFilter(filter: KeyboardEvent) {
    this.dataSource.filter = (filter.target as HTMLInputElement).value.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCustomerComponent);
  }

  pathDataAccessor(item: any, path: string): any {
    return path.split('.')
      .reduce((accumulator: any, key: string) => {
        return accumulator ? accumulator[key] : undefined;
      }, item);
  }
}
