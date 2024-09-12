import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/service/eventService/event.service';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-event-participants',
  templateUrl: './view-event-participants.component.html',
  styleUrls: ['./view-event-participants.component.css']
})
export class ViewEventParticipantsComponent implements OnInit {

  eventId;
  eventOrganiser;
  participantsList = [];
  currentUser;
  forApproval;

  constructor(
    private activeRoute: ActivatedRoute, 
    private _snack:MatSnackBar,
    private standardService:StandardService,
    private eventService:EventService,
    public userService : UserService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.forApproval = params['forApproval'];
    });
    this.eventId = this.activeRoute.snapshot.params.eventId;
    this.eventOrganiser = this.activeRoute.snapshot.params.eventOrganiser;
    this.currentUser = this.userService.getUser().userId;
    console.log("this is event orv ",this.forApproval)
    this.eventService.getEventParticipants(this.eventId).subscribe(
      (data: any) => {
        
        this.participantsList = data;
        console.log(this.participantsList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletEventParticipant(eventId,participantId,participantType) {
    console.log("this is teamID ",eventId," this si userId ",participantId,participantType)
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure , want to delete this Member?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confim
        const removeEventParticipantForm = {
          eventId:eventId,
          participantId:participantId,
          participantType:participantType
        }
        this.eventService.removeEventParticipant(removeEventParticipantForm).subscribe(
          (data) => {
            this._snack.open('Participant Deleted ', '', {
              duration: 3000,
            });
            this.participantsList = this.participantsList.filter((p) => p.participantId != participantId);
          },

          (error) => {
            this._snack.open('Error in deleting Participant', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }
}
