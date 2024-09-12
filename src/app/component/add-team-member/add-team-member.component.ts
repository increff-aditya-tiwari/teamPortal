import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/service/teamService/team.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent implements OnInit {

  teamId;

  constructor(private userService:UserService
    ,private activeRoute:ActivatedRoute,
    private _snack : MatSnackBar,
    private teamService:TeamService
  ) { }


  mapUserTeamForm = {
    teamId:"",
    userIds:[]
  }

  allUserList = [];

  addMember(){
      this.mapUserTeamForm.teamId = this.teamId;
      console.log(this.mapUserTeamForm);
      if (this.mapUserTeamForm.userIds.length == 0) {
        this._snack.open('Users Required !!', '', {
          duration: 3000,
        });
        return;
      }

      this.teamService.mapUserTeam(this.mapUserTeamForm).subscribe(
        (data) => {
          Swal.fire('Success', 'Members are Invited To Join the Team', 'success');
          this.mapUserTeamForm = {
            teamId:'',
            userIds:[]
          };
        },
  
        (error) => {
          Swal.fire('Error!! ', error.error.message, 'error');
          console.log(error);
        }
      );
  }
  ngOnInit(): void {
    this.teamId = this.activeRoute.snapshot.params.teamId;
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.allUserList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
