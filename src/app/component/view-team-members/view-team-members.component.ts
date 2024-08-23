import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-team-members',
  templateUrl: './view-team-members.component.html',
  styleUrls: ['./view-team-members.component.css']
})
export class ViewTeamMembersComponent implements OnInit {

  teamId;
  teamCreatedBy;
  userList = [];
  currentUser;

  constructor(
    private activeRoute: ActivatedRoute, 
    private _snack:MatSnackBar,
    private standardService:StandardService,
    private userService : UserService
  ) { }
  forApproval;
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.forApproval = params['forApproval'];
      // this.eventId = params['eventId'];
    });
    this.teamId = this.activeRoute.snapshot.params.teamId;
    this.teamCreatedBy = this.activeRoute.snapshot.params.teamCreatedBy;
    this.currentUser = this.userService.getUser().userId;
    // console.log("this is event orv ",this.teamCreatedBy," this si currentuser ",this.currentUser)
    console.log(this.teamCreatedBy)
    this.standardService.getTeamMembers(this.teamId).subscribe(
      (data: any) => {
        console.log(data);
        this.userList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  removeTeamMember(teamId,userId) {
    // console.log("this is teamID ",teamId," this si userId ",userId)
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure , want to delete this Member?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confim
        const deleteTeamMemberFrom = {
          teamId:teamId,
          userId:userId
        }
        this.standardService.removeTeamMember(deleteTeamMemberFrom).subscribe(
          (data) => {
            this._snack.open('Member Deleted ', '', {
              duration: 3000,
            });
            this.userList = this.userList.filter((u) => u.userId != userId);
          },

          (error) => {
            this._snack.open('Error in deleting Member', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }

}
