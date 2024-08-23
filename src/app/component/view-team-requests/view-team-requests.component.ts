import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { StandardService } from 'src/app/service/standard/standard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-team-requests',
  templateUrl: './view-team-requests.component.html',
  styleUrls: ['./view-team-requests.component.css']
})
export class ViewTeamRequestsComponent implements OnInit {

  teamId;

  requestList = [];
  constructor(private standardService:StandardService,private activeRoute:ActivatedRoute,private _snack:MatSnackBar) { }
  updateRequestForm = {
    requestDetailId : "",
    requestId : "",
    requestStatus:"",
  }
  allRequestForTeam(teamId){
    this.standardService.allRequestForTeam(teamId).subscribe(
      (data:any) => {
        console.log("this is data ",data);
        this.requestList = data;
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
  ngOnInit(): void {
    this.teamId = this.activeRoute.snapshot.params.teamId;
    this.allRequestForTeam(this.teamId)

  }
  updateRequest(updateRequestForm){
    this.standardService.updateTeamJoinRequest(updateRequestForm).subscribe(
      (data)=>{
        this._snack.open('Request Updated ', '', {
          duration: 3000,
        });
        this.requestList = this.requestList.filter((rq) => rq.id != updateRequestForm.requestDetailId);
      },
      (error)=>{
        Swal.fire('Error!! ', error, 'error');
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
