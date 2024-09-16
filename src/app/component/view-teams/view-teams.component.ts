import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import { TeamService } from 'src/app/service/teamService/team.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.css']
})
export class ViewTeamsComponent implements OnInit {

  joinedTeams: number[] = [];
  teamDataList : any[] = []
  constructor(private standardService:StandardService,
    private teamService:TeamService
    ,public userService:UserService
    ,private router:Router) {
     }

  mapUserTeamForm = {
    teamId:"",
    userIds:[]
  }
  currentUserId;
  notificationsList = [];

  title = 'WebSocketClient';
  stock: any = {};

  getTeamRequests(teamData){
    this.teamService.allRequestForTeam(teamData.team.teamId).subscribe(
      (data:any) => {
        teamData.requestList = data;
      }
    );
  
  }
  getTeamInvites(teamData){
    this.teamService.allInvitesFromTeam(teamData.team.teamId).subscribe(
      (data:any) => {
        teamData.inviteList = data;
      }
    );
  }
  getAllTeams(){
    this.teamService.getAllTeams().subscribe(
      (data: any) => {
        this.teamDataList = data;
      },
      (error) => {
        console.log("thsi si error ",error);
        Swal.fire('Error !!', 'Error in loading Team data', 'error');
      }
    );
  }

  getUserTeamList(){
    this.teamService.getUserTeamList(this.currentUserId).subscribe(
      (data: any)=>{
        this.joinedTeams = data;
        // console.log(this.joinedTeams);
      },
      (error) =>{
        Swal.fire('Error !!', 'Error in loading User Team List', error);
      }
    );
  }

  // notificationDescription
  // : 
  // "Someone Requested to Join Your Team"
  // notificationId
  // : 
  // 155
  // notificationRelation
  // : 
  // "TEAM"
  // notificationRelationId
  // : 
  // 1
  // notificationType
  // : 
  // "REQUEST"

  ngOnInit(): void {
    this.currentUserId = this.userService.getUser().userId;
    this.getAllTeams();
    this.getUserTeamList();

    this.teamService.teamInviteRequest.asObservable().subscribe(
      (data: any) => {
        if (data?.notificationRelation === "TEAM") {
          this.teamDataList.forEach(teamData => {
            if (teamData.team.teamId === data.notificationRelationId) {
              if (data.notificationType === "REQUEST") {
                this.getTeamRequests(teamData);
              } else if (data.notificationType === "INVITE") {
                this.getTeamInvites(teamData);
              }
            }
          });
        }
      }
    );
  }

  navigateToInviteRequests(teamData: any,category) {
    this.router.navigate(['/admin/view-team-requests', teamData.team.teamId], {
      state: { requestType: category, teamData : teamData }
    });
  }


  hasJoinedTeam(teamId: number): boolean {
    return this.joinedTeams.includes(teamId);
  }

  addMember(teamId){
   this.mapUserTeamForm.teamId = teamId;
   this.mapUserTeamForm.userIds.push(this.userService.getUser().userId);
   console.log(this.mapUserTeamForm)
   this.teamService.joinTeam(this.mapUserTeamForm).subscribe(
    (data) => {
      Swal.fire('Success', 'You are Requested to join the team', 'success');
      this.joinedTeams.push(teamId);
      this.mapUserTeamForm = {
        teamId:'',
        userIds:[]
      };
    },

    (error) => {
      Swal.fire('Error!! ', error.error.message, 'error');
      console.log(error);
      this.mapUserTeamForm = {
        teamId:'',
        userIds:[]
      };
    }
  );
  }


  
}
