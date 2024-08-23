import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private standardService:StandardService,private activeRoute:ActivatedRoute,private _snack:MatSnackBar) { }
  updateRequestForm = {
    requestDetailId : "",
    requestId : "",
    requestStatus:"",
  }

  allRequestForEvent(eventId){
    this.standardService.allRequestForEvent(eventId).subscribe(
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
    this.eventId = this.activeRoute.snapshot.params.eventId;
    this.allRequestForEvent(this.eventId);
  }

  updateRequest(updateRequestForm){
    this.standardService.updateEventJoinRequest(updateRequestForm).subscribe(
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
