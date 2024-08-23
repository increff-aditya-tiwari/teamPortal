import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event-participant',
  templateUrl: './add-event-participant.component.html',
  styleUrls: ['./add-event-participant.component.css']
})
export class AddEventParticipantComponent implements OnInit {

  eventId;

  constructor(private userService:UserService,
    private activeRoute:ActivatedRoute,
    private _snack : MatSnackBar,
    private standardService:StandardService
  ) { }

  ngOnInit(): void {
    this.eventId = this.activeRoute.snapshot.params.eventId;
  }

  mapEventParticipantForm  = {
    eventId:"",
    participantsInfoDataList:[
      
    ]
  };

  selectedParticipant = [];
  type = ""
  participantType = [
    {
      id:1,
      type:"TEAM"
    },
    {
      id:2,
      type:"INDIVIDUAL"
    }
  ];

  allParticipantsList = [];


  addParticipants(){
    // console.log(this.selectedParticipant)
    if (this.selectedParticipant.length == 0) {
      this._snack.open('Participants Required !!', '', {
        duration: 3000,
      });
      return;
    }
    this.mapEventParticipantForm.eventId = this.eventId;
    this.selectedParticipant.forEach((participant) =>{
      if(this.type == "TEAM"){
        const localparticipantsInfoDataList = {
          participantType:"TEAM",
          participantId:participant
        }
        this.mapEventParticipantForm.participantsInfoDataList.push(localparticipantsInfoDataList);
      }else{
        const localparticipantsInfoDataList = {
          participantType:"INDIVIDUAL",
          participantId:participant
        }
        this.mapEventParticipantForm.participantsInfoDataList.push(localparticipantsInfoDataList);
      }
    })
    console.log(this.mapEventParticipantForm)
      this.standardService.mapEventParticipant(this.mapEventParticipantForm).subscribe(
        (data) => {
          Swal.fire('Success', 'Participent are added', 'success');
          this.mapEventParticipantForm = {
            eventId:'',
            participantsInfoDataList:[]
          };
        },
  
        (error) => {
          Swal.fire('Error!! ', 'Error while adding Participent', 'error');
          console.log(error);
        }
      );
  }

  getAllTeamList(){
    this.standardService.getAllTeams().subscribe(
      (data: any) => {
        this.allParticipantsList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAllUserList(){
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.allParticipantsList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onTypeChange(selectedType: string) {
    this.type = selectedType;
    this.selectedParticipant = []
    this.mapEventParticipantForm = {
      eventId:'',
      participantsInfoDataList:[]
    };
    if(this.type == "TEAM"){
      this.getAllTeamList();
    }else{
      this.getAllUserList();
    }
  }


}
