import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventClaimExpenseComponent } from './view-event-claim-expense.component';

describe('ViewEventClaimExpenseComponent', () => {
  let component: ViewEventClaimExpenseComponent;
  let fixture: ComponentFixture<ViewEventClaimExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventClaimExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventClaimExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
