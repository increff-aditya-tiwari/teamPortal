import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventParticipantComponent } from './add-event-participant.component';

describe('AddEventParticipantComponent', () => {
  let component: AddEventParticipantComponent;
  let fixture: ComponentFixture<AddEventParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
