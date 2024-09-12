import { Component, Inject, OnInit } from '@angular/core';
import { error } from 'console';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import { FilePreviewComponent } from '../file-preview/file-preview.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/service/teamService/team.service';
import { EventService } from 'src/app/service/eventService/event.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {




  constructor(
    private standardService : StandardService
    ,private userService:UserService,
    private teamService:TeamService,
    private eventService:EventService,
    public dialogRef: MatDialogRef<NotificationsComponent>,
    @Inject(MAT_DIALOG_DATA) public notifications: any[],
    public router:Router
    

  ) { }




  ngOnInit(): void {
    
  }

  notificationRelationData;
  getTeamData(teamId): Promise<any> {
    return this.teamService.getTeamByTeamId(teamId).toPromise();
  }

  getEventData(eventId): Promise<any> {
    return this.eventService.getEventByEventId(eventId).toPromise();
  }

  getNotificationRelationData(notification): Promise<any> {
    if (notification.notificationRelation === 'TEAM') {
      return this.getTeamData(notification.notificationRelationId);
    } else if (notification.notificationRelation === 'EVENT') {
      return this.getEventData(notification.notificationRelationId);
    }
    return Promise.resolve(null); // Return a resolved promise if no valid relation is found
  }


  async redirectFromNotification(notification: any) {
    const relation = notification.notificationRelation;
    const type = notification.notificationType;
    this.notificationRelationData = await this.getNotificationRelationData(notification);
    this.dialogRef.close();
    if (relation === 'TEAM') {
      if (type === 'INVITE' || type === 'REQUEST') {
        this.router.navigate(['/admin/view-team-requests', notification.notificationRelationId], {
          state: { requestType: type }
        });
      } else if (type === 'INVITE_ACCEPTED' || type === 'REQUEST_ACCEPTED') {
        this.router.navigate(['/admin/view-team-members/' + notification.notificationRelationId + '/' + this.notificationRelationData.createdBy]);
      }else if (type === 'INVITE_REJECTED' || type === 'REQUEST_REJECTED') {
        this.router.navigate(['/admin/teams']);
      }
    } else if (relation === 'EVENT') {
      if (type === 'INVITE' || type === 'REQUEST') {
        this.router.navigate(['/admin/view-event-requests', notification.notificationRelationId], {
          state: { requestType: type }
        });
      } else if (type === 'INVITE_ACCEPTED' || type === 'REQUEST_ACCEPTED') {
        this.router.navigate(['/admin/view-event-participants/' + notification.notificationRelationId + '/' + this.notificationRelationData.eventOrganiser]);
      }else if (type === 'INVITE_REJECTED' || type === 'REQUEST_REJECTED') {
        this.router.navigate(['/admin/events']);
      }
    }
    // I have to add more conditions for claim and other notifications.
  }


}
