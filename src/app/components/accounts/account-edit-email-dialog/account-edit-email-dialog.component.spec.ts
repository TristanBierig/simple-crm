import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditEmailDialogComponent } from './account-edit-email-dialog.component';

describe('AccountEditEmailDialogComponent', () => {
  let component: AccountEditEmailDialogComponent;
  let fixture: ComponentFixture<AccountEditEmailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountEditEmailDialogComponent]
    });
    fixture = TestBed.createComponent(AccountEditEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
