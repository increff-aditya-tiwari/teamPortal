import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StandardService } from 'src/app/service/standard/standard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private _snack : MatSnackBar,private standardService:StandardService) { }

  eventForm = {
    eventName: '',
    description: '',
    eventCategory: '',
    eventStatus: ''
  };

  eventCategory = [
    {
      id:1,
      type:"SPORTS"
    },
    {
      id:2,
      type:"TRAVEL"
    },
    {
      id:3,
      type:"OUTING"
    }
  ];

  eventStatus = [
    {
      id:1,
      status:"CREATED"
    },
    {
      id:2,
      status:"ONGOING"
    },
    {
      id:3,
      status:"COMPLETED"
    }
  ];


  ngOnInit(): void {
  }

  addEvent(){
      console.log(this.eventForm)
      if (this.eventForm.eventName.trim() == '' || this.eventForm.eventName == null) {
        this._snack.open('Title Required !!', '', {
          duration: 3000,
        });
        return;
      }

      this.standardService.addEvent(this.eventForm).subscribe(
        () => {
          Swal.fire('Success', 'Event is added', 'success');
          this.eventForm = {
            eventName: '',
            description: '',
            eventCategory: '',
            eventStatus: ''
          };
        },
  
        (error) => {
          Swal.fire('Error!! ', error.error, 'error');
          console.log(error);
        }
      );
  }

}
