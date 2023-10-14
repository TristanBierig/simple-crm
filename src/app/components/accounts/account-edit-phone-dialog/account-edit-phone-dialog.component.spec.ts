import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditPhoneDialogComponent } from './account-edit-phone-dialog.component';

describe('AccountEditPhoneDialogComponent', () => {
  let component: AccountEditPhoneDialogComponent;
  let fixture: ComponentFixture<AccountEditPhoneDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountEditPhoneDialogComponent]
    });
    fixture = TestBed.createComponent(AccountEditPhoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
