import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationsComponent } from '../notifications/notifications.component';
import {MatMenuModule,MatMenu,MatMenuContent} from '@angular/material/menu';
import { TeamService } from 'src/app/service/teamService/team.service';
import { EventService } from 'src/app/service/eventService/event.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = null;
  notificationsList : any;
  notifications =0;
  reconnectWebSocket = false;

  private webSocket: WebSocket;
  constructor(
    public standardService:StandardService,
    public userService:UserService,
    public teamService:TeamService,
    private eventService:EventService,
    public router:Router,
    private dialog: MatDialog
  ) {}


  hasAppAdminAuthority;

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.hasAppAdminAuthority = this.userService.getUserAccess()?.some(auth => auth.authority == "app.admin");
    this.user = this.userService.getUser();
    if (this.isLoggedIn) {
      console.log("we are going to subscribe the websocket")
      this.reconnectWebSocket = true;
      this.webSocket = this.createNewWebSocket();
      this.attachWebSocketListeners();  
      this.getAllNotification();
    }
    this.userService.loginStatusSubject.asObservable().subscribe((data) => {

      this.isLoggedIn = this.userService.isLoggedIn();
      this.user = this.userService.getUser(); 
      if(data){
        this.reconnectWebSocket = true;
        console.log("we are going to subscribe the websocket in observable")
        this.webSocket = this.createNewWebSocket();
        this.attachWebSocketListeners(); 
        this.getAllNotification();
      }
    });
  }

  openNotifications(){
    const dialogRef = this.dialog.open(NotificationsComponent, {
      data: this.notificationsList,
      width: '400px',
      maxHeight: '500px',
      position: {
        top: '65px',    // You can adjust these values
        right: '10px'   // Or use 'right' and 'bottom' as well
      }
    });
  }

  private getAllNotification(){
    this.userService.getAllNotificatioForUser(this.userService.getUser().userId).subscribe(
      (data)=>{
        console.log("this is notification data ",data)
        this.notificationsList = data;
        this.notifications = this.notificationsList.length;
      },(error) =>{

      }
    )
  }

  private getTeamInviteRequestData(data){
    this.teamService.teamInviteRequest.next(data);
  }

  private getEventInviteRequestData(data){
    this.eventService.eventInviteRequest.next(data);
  }

  private attachWebSocketListeners() {
    this.webSocket.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        console.log("Received data:", messageData);
        this.notificationsList.push(messageData);
        if(messageData.notificationRelation === 'TEAM'){
          this.getTeamInviteRequestData(messageData);
        }else if(messageData.notificationRelation === 'EVENT'){
          this.getEventInviteRequestData(messageData);
        }
        this.notifications = this.notificationsList.length;
    };

    this.webSocket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      console.log("Code:", event.code, "Reason:", event.reason, "Was clean:", event.wasClean);
      if(this.reconnectWebSocket){
        this.webSocket = this.createNewWebSocket();
      }
    };

    this.webSocket.onerror = (event) => {
        console.error("WebSocket error observed:", event);
    };
}
  
  createNewWebSocket(){
    console.log("going to create socket connection")
    return new WebSocket(`ws://localhost:8080/send-notification/${this.userService.getToken()}`); 
  };

  public logout() {
    this.reconnectWebSocket = false;
    this.userService.logout().subscribe(
      (data) =>{
        this.userService.removeCredentioals();
        this.userService.loginStatusSubject.next(false);
        this.router.navigate(['login']);
      }
    )
  }
}
