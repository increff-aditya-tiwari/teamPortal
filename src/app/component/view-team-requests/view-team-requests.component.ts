import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/service/teamService/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-team-requests',
  templateUrl: './view-team-requests.component.html',
  styleUrls: ['./view-team-requests.component.css']
})
export class ViewTeamRequestsComponent implements OnInit {
  teamId;
  teamData : any;

  requestInviteList = [];
  requestType=""
  constructor(
    private teamService:TeamService
    ,private activeRoute:ActivatedRoute
    ,private _snack:MatSnackBar,
    private router:Router
  ) { }
  updateRequestForm = {
    requestDetailId : "",
    requestId : "",
    requestStatus:"",
  }
  allRequestForTeam(teamId){
    this.teamService.allRequestForTeam(teamId).subscribe(
      (data:any) => {
        console.log("this is request data ",data);
        this.requestInviteList = data;
      },
  
      (error) => {
        Swal.fire('Error!! ', error.error.message, 'error');
        console.log(error);
        // this.mapUserTeamForm = {
        //   teamId:'',
        //   userIds:[]
        // };
      }
    );
  }
  private allInviteFromTeam(teamId){
    this.teamService.allInvitesFromTeam(teamId).subscribe(
      (data:any) => {
        console.log("this is invite data ",data);
        if(data){
          this.requestInviteList.push(data);
        }
      },
  
      (error) => {
        Swal.fire('Error!! ', error.error.message, 'error');
        console.log(error);
        // this.mapUserTeamForm = {
        //   teamId:'',
        //   userIds:[]
        // };
      }
    );
  }
  ngOnInit(): void {
    this.teamId = this.activeRoute.snapshot.params.teamId;
    this.requestType = history.state.requestType;
    if(this.requestType=='REQUEST'){
      this.allRequestForTeam(this.teamId)
    }else{
      this.allInviteFromTeam(this.teamId)
    }
    // this.requestInviteList = this.teamData.requests;
    console.log("this is team data ",this.requestInviteList);

  }
  updateRequest(updateRequestForm){
    this.teamService.updateTeamJoinRequest(updateRequestForm).subscribe(
      (data)=>{
        this._snack.open('Request Updated ', '', {
          duration: 3000,
        });
        this.requestInviteList = this.requestInviteList.filter((rq) => rq.id != updateRequestForm.requestDetailId);
      },
      (error)=>{
        Swal.fire('Error!! ', error.error.message, 'error');
      }
    )
  }
  declineRequest(rdId){
    this.updateRequestForm.requestDetailId = rdId;
    this.updateRequestForm.requestId = this.teamId;
    this.updateRequestForm.requestStatus = "REJECTED";
    this.updateRequest(this.updateRequestForm);
  }
  acceptRequest(rdId){
    this.updateRequestForm.requestDetailId = rdId;
    this.updateRequestForm.requestId = this.teamId;
    this.updateRequestForm.requestStatus = "ACCEPTED";
    this.updateRequest(this.updateRequestForm);
  }
}
