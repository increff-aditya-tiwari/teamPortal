import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as SockJS from 'sockjs-client';
import { EventService } from 'src/app/service/eventService/event.service';
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

  constructor(private standardService:StandardService,
    private eventService:EventService
    // ,private webSocketService: WebSocketService
    ,public userService:UserService,
    private activeRoute:ActivatedRoute,
    private router:Router
  ) { }

  currentUser;

  eventDataList : any[] = []
  forApproval;
  eventId;
  mapEventParticipantForm  = {
    eventId:"",
    participantsInfoDataList:[
      
    ]
  };

  getAllEvents(){
    this.eventService.getAllEvents().subscribe(
      (data: any) => {
        this.eventDataList = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }

  getParticipantEventList(){
    this.eventService.getParticipantEventList(this.currentUser).subscribe(
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
    this.eventService.getEventByEventId(this.eventId).subscribe(
      (data) => {
        const localEventData = {
          event:{},
          requestList:[],
          inviteList:[]
        }
        localEventData.event=data;
        this.eventDataList.push(localEventData);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }
  notifications = [];

  getEventRequests(eventData){
    this.eventService.allRequestForEvent(eventData.event.eventId).subscribe(
      (data:any) => {
        eventData.requestList = data;
      }
    );
  
  }
  getEventInvites(eventData){
    this.eventService.allInvitesFromEvent(eventData.event.eventId).subscribe(
      (data:any) => {
        eventData.inviteList = data;
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

    this.eventService.eventInviteRequest.asObservable().subscribe(
      (data: any) => {
        if (data?.notificationRelation === "EVENT") {
          this.eventDataList.forEach(eventData => {
            if (eventData.event.eventId === data.notificationRelationId) {
              if (data.notificationType === "REQUEST") {
                this.getEventRequests(eventData);
              } else if (data.notificationType === "INVITE") {
                this.getEventInvites(eventData);
              }
            }
          });
        }
      }
    );
    
  }
  notify(){
    this.standardService.notifyUser().subscribe(
      (data) => {
        console.log("notifying to user ",data);
      },(error)=>{
        console.log("this is error ",error.error);
      }
    )
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
    this.eventService.joinEvent(this.mapEventParticipantForm).subscribe(
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

   navigateToInviteRequests(eventData: any,category) {
    this.router.navigate(['/admin/view-event-requests/', eventData.event.eventId], {
      state: { requestType: category,eventData : eventData }
    });
  }

}
