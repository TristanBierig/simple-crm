import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.class';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';
import { DialogEditCustomerPersonalComponent } from '../dialog-edit-customer-personal/dialog-edit-customer-personal.component';
import { DialogEditCustomerProjectsComponent } from '../dialog-edit-customer-projects/dialog-edit-customer-projects.component';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  customerDetail!: Customer;
  customerId!: string;

  private componentIsDestroyed$ = new Subject<boolean>();

  constructor(
    private fireService: FirestoreService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cacheCustomerId();
    this.fireService.startSubSingle(this.customerId);
    this.fireService.singleCustomer$
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe((customer) => {
        this.customerDetail = customer;
      });
  }

  ngOnDestroy() {
    this.fireService.unsubSingleCustomer();
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  cacheCustomerId() {
    let currentId = this.route.snapshot.paramMap.get('id');
    if (currentId) {
      this.customerId = currentId;
    }
  }

  getSingleCustomer(): Customer {
    return this.fireService.singleCustomer;
  }

  openMainEdit() {
    this.dialog.open(DialogEditCustomerComponent, {
      data: { content: this.customerDetail, docRef: this.customerId },
    });
  }

  openPersonalEdit() {
    this.dialog.open(DialogEditCustomerPersonalComponent, {
      data: { content: this.customerDetail, docRef: this.customerId },
    });
  }

  openProjectsEdit() {
    this.dialog.open(DialogEditCustomerProjectsComponent, {
      data: { content: this.customerDetail, docRef: this.customerId },
    });
  }
}
