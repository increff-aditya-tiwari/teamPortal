import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-event-claims',
  templateUrl: './view-event-claims.component.html',
  styleUrls: ['./view-event-claims.component.css']
})
export class ViewEventClaimsComponent implements OnInit {

  eventId;
  currentUser;
  eventOrganiser;
  constructor(private activeRoute:ActivatedRoute,private standardService : StandardService,private _snack:MatSnackBar,private userService:UserService) { }
  claimList = []

  getAllEventClaims(){
    this.standardService.getEventClaims(this.eventId).subscribe(
      (data: any) => {
        
        this.claimList = data;
        this.claimList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        console.log(this.claimList);
      },
      (error) => {
        Swal.fire('Error!! ', 'Somethin Went wrong Please try later', 'error');
        // console.log(error);
      }
    );
  }
  getIconName(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'thumb_up';
      case 'REJECTED':
        return 'thumb_down';
      case 'PENDING':
        return 'hourglass_empty';
      default:
        return '';
    }
  }
  
  getButtonClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'icon-green';
      case 'REJECTED':
        return 'icon-red';
      case 'PENDING':
        return 'icon-yellow';
      default:
        return '';
    }
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.forApproval = params['forApproval'];
    });
    this.eventId = this.activeRoute.snapshot.params.eventId;
    this.eventOrganiser = this.activeRoute.snapshot.params.eventOrganiser;
    this.currentUser = this.userService.getUser().userId;
    console.log(this.eventOrganiser);
      this.getAllEventClaims();
  }
  forApproval;
  addClaim(){
    this.standardService.addClaim(this.eventId).subscribe(
      (data)=>{
        this._snack.open('Claim Added ', '', {
          duration: 3000,
        });
        this.getAllEventClaims();
      },
      (error)=>{
        Swal.fire('Something Went Wrong ', error.error, 'error');
      }
    )
  }

}
