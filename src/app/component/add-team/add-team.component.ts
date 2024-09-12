import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StandardService } from 'src/app/service/standard/standard.service';
import { TeamService } from 'src/app/service/teamService/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  team = {
    teamName: '',
    description: '',
  };

  constructor(private standardService:StandardService,
    private teamService:TeamService
    ,private _snack :MatSnackBar) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if (this.team.teamName.trim() == '' || this.team.teamName == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    //all done

    this.teamService.addTeam(this.team).subscribe(
      (data:any) => {
        this.team.teamName = '';
        this.team.description = '';
        Swal.fire('Success !!', 'Team is added successfuly', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server error !!', 'error');
      }
    );
  }

}
