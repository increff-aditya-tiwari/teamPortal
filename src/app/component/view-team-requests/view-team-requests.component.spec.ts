import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamRequestsComponent } from './view-team-requests.component';

describe('ViewTeamRequestsComponent', () => {
  let component: ViewTeamRequestsComponent;
  let fixture: ComponentFixture<ViewTeamRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeamRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
