import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/service/eventService/event.service';
import { StandardService } from 'src/app/service/standard/standard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-event-requests',
  templateUrl: './view-event-requests.component.html',
  styleUrls: ['./view-event-requests.component.css']
})
export class ViewEventRequestsComponent implements OnInit {

  eventId;
  requestList = [];
  eventRequestIntviteList = [];
  requestType="";
  constructor(private standardService:StandardService,
    private eventService:EventService,
    private activeRoute:ActivatedRoute,
    private _snack:MatSnackBar) { }
  updateRequestForm = {
    requestDetailId : "",
    requestId : "",
    requestStatus:"",
  }

  allRequestForEvent(eventId){
    this.eventService.allRequestForEvent(eventId).subscribe(
      (data:any) => {
        console.log("this is data ",data);
        this.eventRequestIntviteList = data;
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

  private allInviteForEvent(eventId){
    this.eventService.allInvitesFromEvent(eventId).subscribe(
      (data:any) => {
        // console.log("this is data ",data);
        this.eventRequestIntviteList = data;
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
    this.eventId = this.activeRoute.snapshot.params.eventId;
    this.requestType = history.state.requestType;
    if(this.requestType=='REQUEST'){
      this.allRequestForEvent(this.eventId);
    }else{
      this.allInviteForEvent(this.eventId)
    }
  }

  updateRequest(updateRequestForm){
    this.eventService.updateEventJoinRequest(updateRequestForm).subscribe(
      (data)=>{
        this._snack.open('Request Updated ', '', {
          duration: 3000,
        });
        this.eventRequestIntviteList = this.eventRequestIntviteList.filter((rq) => rq.id != updateRequestForm.requestDetailId);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!! ', error.error.message, 'error');
      }
    )
  }
  declineRequest(rdId){
    this.updateRequestForm.requestDetailId = rdId;
    this.updateRequestForm.requestId = this.eventId;
    this.updateRequestForm.requestStatus = "REJECTED";
    this.updateRequest(this.updateRequestForm);
  }
  acceptRequest(rdId){
    this.updateRequestForm.requestDetailId = rdId;
    this.updateRequestForm.requestId = this.eventId;
    this.updateRequestForm.requestStatus = "ACCEPTED";
    this.updateRequest(this.updateRequestForm);
  }
}
