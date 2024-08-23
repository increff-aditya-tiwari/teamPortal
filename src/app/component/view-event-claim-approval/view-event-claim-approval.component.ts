import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-event-claim-approval',
  templateUrl: './view-event-claim-approval.component.html',
  styleUrls: ['./view-event-claim-approval.component.css']
})
export class ViewEventClaimApprovalComponent implements OnInit {

  constructor(private standardService:StandardService,private activeRoute:ActivatedRoute) { }
  claimId;
  approvalList = []

  getAllClaimApprovals(){
    this.standardService.getAllClaimApprovals(this.claimId).subscribe(
      (data: any) => {
        
        this.approvalList = data;
        console.log(this.approvalList);
      },
      (error) => {
        Swal.fire('Error!! ', 'Somethin Went wrong Please try later', 'error');
        console.log(error);
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
    this.claimId = this.activeRoute.snapshot.params.claimId;
    this.getAllClaimApprovals();
  }

}
