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

  events = []
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
        this.events = data;
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
        this.events.push(data)
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }
  notifications = [];
  
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

    // this.webSocketService.notifications$.subscribe(notification => {
    //   console.log("this is notification ", notification);
    //   this.notifications.push(notification);
    // });
    
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

   navigateToInviteRequests(event: any,category) {
    this.router.navigate(['/admin/view-event-requests/', event.eventId], {
      state: { requestType: category }
    });
  }

   connectWebSocket(){
    // var token = this.userService.getToken();
    // var stompClient = Stomp.over(function(){
    //   return new SockJS('http://localhost:8080/ws')
    // });
    // stompClient.connect({Authorization: `Bearer ${token}`}, (frame) =>{
    //   console.log("connected ",frame);
    // });

   }
  // connectWebSocket() {
  //   // Create a SockJS instance
  //   // const socket = new WebSocket('http://localhost:8080/server-side');
    
  //   // Create a STOMP client instance
  //   // const stompClient = Stomp.over(socket);
  //   const stompClient = Stomp.over(function(){
  //     return new SockJS('http://localhost:15674/server-side')
  //   });

  
  //   // Connect to the STOMP server
  //   stompClient.connect({}, (frame) => {
  //     console.log('Connected: ', frame);
  
  //     // Subscribe to a topic after connection is established
  //     stompClient.subscribe('/topic/notifications', (message) => {
  //       console.log('Received message: ', message.body);
  //       // Process message here
  //     });
  //   }, (error) => {
  //     console.error('STOMP error: ', error);
  //   });
  
  //   // Optional: Handle WebSocket connection close
  //   stompClient.connectHeaders = {
  //     login: 'guest',
  //     passcode: 'guest'
  //   };
  // }

}
