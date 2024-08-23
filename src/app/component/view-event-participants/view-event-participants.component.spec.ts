import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventParticipantsComponent } from './view-event-participants.component';

describe('ViewEventParticipantsComponent', () => {
  let component: ViewEventParticipantsComponent;
  let fixture: ComponentFixture<ViewEventParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEventParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
