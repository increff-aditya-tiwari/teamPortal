import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventRequestsComponent } from './view-event-requests.component';

describe('ViewEventRequestsComponent', () => {
  let component: ViewEventRequestsComponent;
  let fixture: ComponentFixture<ViewEventRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
