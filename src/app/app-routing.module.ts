import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './service/guard/admin.guard';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { NormalUserGuard } from './service/guard/normal-user.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { AddTeamComponent } from './component/add-team/add-team.component';
import { ViewTeamsComponent } from './component/view-teams/view-teams.component';
import { AddEventComponent } from './component/add-event/add-event.component';
import { ViewEventsComponent } from './component/view-events/view-events.component';
import { ViewTeamMembersComponent } from './component/view-team-members/view-team-members.component';
import { AddTeamMemberComponent } from './component/add-team-member/add-team-member.component';
import { ViewEventParticipantsComponent } from './component/view-event-participants/view-event-participants.component';
import { AddEventParticipantComponent } from './component/add-event-participant/add-event-participant.component';
import { ViewTeamRequestsComponent } from './component/view-team-requests/view-team-requests.component';
import { ViewEventRequestsComponent } from './component/view-event-requests/view-event-requests.component';
import { ViewEventClaimsComponent } from './component/view-event-claims/view-event-claims.component';
import { AddEventClaimExpenseComponent } from './component/add-event-claim-expense/add-event-claim-expense.component';
import { ViewEventClaimExpenseComponent } from './component/view-event-claim-expense/view-event-claim-expense.component';
import { ViewEventClaimApprovalComponent } from './component/view-event-claim-approval/view-event-claim-approval.component';
import { UpdateEventClaimExpenseComponent } from './component/update-event-claim-expense/update-event-claim-expense.component';
import { ViewApprovalComponent } from './component/view-approval/view-approval.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path : 'signup',
    component: SignupComponent,
    pathMatch:'full'
  },
  {
    path : 'admin',
    component: AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path: 'home',
        component: UserHomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'create-team',
        component: AddTeamComponent,
      },
      {
        path: 'teams',
        component: ViewTeamsComponent,
      },
      {
        path: 'create-event',
        component: AddEventComponent,
      },
      {
        path: 'events',
        component: ViewEventsComponent,
      },
      {
        path: 'view-team-members/:teamId/:teamCreatedBy',
        component: ViewTeamMembersComponent,
      },{
        path: 'add-team-member/:teamId',
        component:AddTeamMemberComponent
      },
      {
        path: 'view-event-participants/:eventId/:eventOrganiser',
        component: ViewEventParticipantsComponent,
      },{
        path: 'add-event-participant/:eventId',
        component:AddEventParticipantComponent
      },{
        path:'view-team-requests/:teamId',
        component:ViewTeamRequestsComponent
      },{
        path:'view-event-requests/:eventId',
        component:ViewEventRequestsComponent
      },{
        path:'view-event-claims/:eventId/:eventOrganiser',
        component:ViewEventClaimsComponent
      },{
        path:'add-event-claim-expense/:eventOrganiser/:claimId',
        component:AddEventClaimExpenseComponent
      },{
        path:'update-event-claim-expenses/:eventId/:claimId/:expenseId',
        component:UpdateEventClaimExpenseComponent
      },{
        path:'view-event-claim-expenses/:eventOrganiser/:claimId',
        component:ViewEventClaimExpenseComponent
      },{
        path:'view-event-claim-approval/:eventId/:claimId',
        component:ViewEventClaimApprovalComponent
      },{
        path:'view-approvals',
        component:ViewApprovalComponent
      }
    ]
  },
  {
    path : 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch:'full',
    // canActivate:[AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
