import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventClaimExpenseComponent } from './add-event-claim-expense.component';

describe('AddEventClaimExpenseComponent', () => {
  let component: AddEventClaimExpenseComponent;
  let fixture: ComponentFixture<AddEventClaimExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventClaimExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventClaimExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
