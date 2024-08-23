import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventClaimExpenseComponent } from './update-event-claim-expense.component';

describe('UpdateEventClaimExpenseComponent', () => {
  let component: UpdateEventClaimExpenseComponent;
  let fixture: ComponentFixture<UpdateEventClaimExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEventClaimExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEventClaimExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
