import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventClaimsComponent } from './view-event-claims.component';

describe('ViewEventClaimsComponent', () => {
  let component: ViewEventClaimsComponent;
  let fixture: ComponentFixture<ViewEventClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
