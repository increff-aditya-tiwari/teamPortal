import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventClaimApprovalComponent } from './view-event-claim-approval.component';

describe('ViewEventClaimApprovalComponent', () => {
  let component: ViewEventClaimApprovalComponent;
  let fixture: ComponentFixture<ViewEventClaimApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventClaimApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventClaimApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
