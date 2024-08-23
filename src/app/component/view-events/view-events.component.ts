import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {

  joinedEvents: number[] = [];

  constructor(private standardService:StandardService,public userService:UserService,private activeRoute:ActivatedRoute) { }

  currentUser;

  events = []
  forApproval;
  eventId;
  mapEventParticipantForm  = {
    eventId:"",
    participantsInfoDataList:[
      
    ]
  };

  getAllEvents(){
    this.standardService.getAllEvents().subscribe(
      (data: any) => {
        this.events = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }

  getParticipantEventList(){
    this.standardService.getParticipantEventList(this.currentUser).subscribe(
      (data: any)=>{
        this.joinedEvents = data;
        // console.log(this.joinedEvents);
      },
      (error) =>{
        Swal.fire('Error !!', 'Error in loading User Event List', error);
      }
    )
  }

  getEventByEventId(){
    this.standardService.getEventByEventId(this.eventId).subscribe(
      (data: any) => {
        this.events.push(data)
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }
  
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.forApproval = params['forApproval'];
      this.eventId = params['eventId'];
    });
    this.currentUser = this.userService.getUser().userId;
    if(this.forApproval == 'true'){
      this.getEventByEventId();
      this.joinedEvents.push(this.eventId);
    }else{
      this.getAllEvents()
      this.getParticipantEventList();
    }
    
  }

  hasJoinedEvent(eventId: number): boolean {
    return this.joinedEvents.includes(eventId);
  }

  addMember(eventId){
    this.mapEventParticipantForm.eventId = eventId;
    const localparticipantsInfoDataList = {
      participantType:"INDIVIDUAL",
      participantId:this.currentUser
    }
    this.mapEventParticipantForm.participantsInfoDataList.push(localparticipantsInfoDataList);
    console.log(this.mapEventParticipantForm)
    this.standardService.joinEvent(this.mapEventParticipantForm).subscribe(
     (data : string) => {
       Swal.fire('Success', 'You are Requested to join the Event', 'success');
       this.joinedEvents.push(eventId);
       this.mapEventParticipantForm = {
         eventId:'',
         participantsInfoDataList:[]
       };
     },
 
     (error) => {
       Swal.fire('Error!! ', error.error, 'error');
       console.log(error)
       this.mapEventParticipantForm = {
        eventId:'',
        participantsInfoDataList:[]
      };
       console.log(error.error);
     }
   );
   }

}
