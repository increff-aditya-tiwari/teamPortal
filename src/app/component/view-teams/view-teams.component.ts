import { Component, OnInit } from '@angular/core';
import { StandardService } from 'src/app/service/standard/standard.service';
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
  constructor(private standardService:StandardService,public userService:UserService) { }

  mapUserTeamForm = {
    teamId:"",
    userIds:[]
  }
  currentUserId;
  ngOnInit(): void {
    this.currentUserId = this.userService.getUser().userId;
    this.standardService.getAllTeams().subscribe(
      (data: any) => {
        this.teams = data;
      },

      (error) => {
        //
        console.log("thsi si error ",error);
        Swal.fire('Error !!', 'Error in loading Team data', 'error');
      }
    );

    this.standardService.getUserTeamList(this.currentUserId).subscribe(
      (data: any)=>{
        this.joinedTeams = data;
        console.log(this.joinedTeams);
      },
      (error) =>{
        Swal.fire('Error !!', 'Error in loading User Team List', error);
      }
    )

  }


  hasJoinedTeam(teamId: number): boolean {
    return this.joinedTeams.includes(teamId);
  }

  addMember(teamId){
   this.mapUserTeamForm.teamId = teamId;
  //  this.mapUserTeamForm.userIds.push(this.userService.getUser().userId);
   console.log(this.mapUserTeamForm)
   this.standardService.joinTeam(this.mapUserTeamForm).subscribe(
    (data) => {
      Swal.fire('Success', 'You are Requested to join the team', 'success');
      this.joinedTeams.push(teamId);
      this.mapUserTeamForm = {
        teamId:'',
        userIds:[]
      };
    },

    (error) => {
      Swal.fire('Error!! ', error.error, 'error');
      console.log(error);
      this.mapUserTeamForm = {
        teamId:'',
        userIds:[]
      };
    }
  );
  }


  
}
