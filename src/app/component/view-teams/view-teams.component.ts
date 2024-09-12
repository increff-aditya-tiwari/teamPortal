import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import { TeamService } from 'src/app/service/teamService/team.service';
import { UserService } from 'src/app/service/userService/user.service';
import { Team } from 'src/app/types/team';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.css']
})
export class ViewTeamsComponent implements OnInit {

  joinedTeams: number[] = [];
  teams : []
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

  getTeamRequests(team){
    this.teamService.allRequestForTeam(team.teamId).subscribe(
      (data:any) => {
        // console.log("this is requests ",data);
        team.requests = data;
      },
  
      (error) => {
        Swal.fire('Error!! ', error, 'error');
        console.log(error);
        // this.mapUserTeamForm = {
        //   teamId:'',
        //   userIds:[]
        // };
      }
    );
  
  }
  getTeamInvites(team){
    this.teamService.allInvitesFromTeam(team.teamId).subscribe(
      (data:any) => {
        // console.log("this is invites ",data);
        team.invites = data;
      },
  
      (error) => {
        Swal.fire('Error!! ', error, 'error');
        console.log(error);
      }
    );
  
  }
  private webSocket: WebSocket;
  ngOnInit(): void {
    this.currentUserId = this.userService.getUser().userId;
    
    this.teamService.getAllTeams().subscribe(
      (data: any) => {
        this.teams = data;
        this.teams.forEach((team) => {
          // this.getTeamRequests(team);
          // this.getTeamInvites(team);
        });
      },

      (error) => {
        //
        console.log("thsi si error ",error);
        Swal.fire('Error !!', 'Error in loading Team data', 'error');
      }
    );

    this.teamService.getUserTeamList(this.currentUserId).subscribe(
      (data: any)=>{
        this.joinedTeams = data;
        // console.log(this.joinedTeams);
      },
      (error) =>{
        Swal.fire('Error !!', 'Error in loading User Team List', error);
      }
    )

    // this.webSocket = new WebSocket(`ws://localhost:8080/send-notification/${this.userService.getToken()}`);
    // this.webSocket.onmessage = (event) => {
    //   console.log("this is data ",event.data);
    //   this.notificationsList.push(JSON.parse(event.data));
    //   // this.notifications
    //   console.log("this is notificationsList ", this.notificationsList)
    // };

  }

  navigateToInviteRequests(team: any,category) {
    this.router.navigate(['/admin/view-team-requests', team.teamId], {
      state: { requestType: category }
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
