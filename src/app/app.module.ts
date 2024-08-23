import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './service/authentication/auth.interceptor';
import { ViewTeamsComponent } from './component/view-teams/view-teams.component';
import { AddEventComponent } from './component/add-event/add-event.component';
import { AddTeamComponent } from './component/add-team/add-team.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { ViewEventsComponent } from './component/view-events/view-events.component';
import { ViewTeamMembersComponent } from './component/view-team-members/view-team-members.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AddTeamMemberComponent } from './component/add-team-member/add-team-member.component';
import { ViewEventParticipantsComponent } from './component/view-event-participants/view-event-participants.component';
import { AddEventParticipantComponent } from './component/add-event-participant/add-event-participant.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { ViewTeamRequestsComponent } from './component/view-team-requests/view-team-requests.component';
import { ViewEventRequestsComponent } from './component/view-event-requests/view-event-requests.component';
import { ViewEventClaimsComponent } from './component/view-event-claims/view-event-claims.component';
import { AddEventClaimExpenseComponent } from './component/add-event-claim-expense/add-event-claim-expense.component';
import { ViewEventClaimExpenseComponent } from './component/view-event-claim-expense/view-event-claim-expense.component';
import { ViewEventClaimApprovalComponent } from './component/view-event-claim-approval/view-event-claim-approval.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge'
import { UpdateEventClaimExpenseComponent } from './component/update-event-claim-expense/update-event-claim-expense.component';
import { ViewApprovalComponent } from './component/view-approval/view-approval.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ViewTeamsComponent,
    AddEventComponent,
    AddTeamComponent,
    ProfileComponent,
    UserHomeComponent,
    ViewEventsComponent,
    ViewTeamsComponent,
    ViewTeamMembersComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    SidebarComponent,
    AddTeamMemberComponent,
    ViewEventParticipantsComponent,
    AddEventParticipantComponent,
    ViewTeamRequestsComponent,
    ViewEventRequestsComponent,
    ViewEventClaimsComponent,
    AddEventClaimExpenseComponent,
    ViewEventClaimExpenseComponent,
    ViewEventClaimApprovalComponent,
    UpdateEventClaimExpenseComponent,
    ViewApprovalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    NgxUiLoaderModule.forRoot({
      // bgsType:SPINNER.chasingDots
      fgsType:'square-jelly-box'
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
      // bgsType: SPINNER.rectangleBounce
      // bgsType:
    }),
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
