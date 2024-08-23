import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { StandardService } from 'src/app/service/standard/standard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-approval',
  templateUrl: './view-approval.component.html',
  styleUrls: ['./view-approval.component.css']
})
export class ViewApprovalComponent implements OnInit {

  constructor(private standardService : StandardService,private router:Router,private _snack:MatSnackBar) { }
  approvalList=[]
  claim;
  getAllPendingApprovals(){
    this.standardService.getAllPendingApprovals().subscribe(
      (data: any) => {
        
        this.approvalList=data
        console.log(this.approvalList);
      },
      (error) => {
        Swal.fire('Error!! ', 'Somethin Went wrong Please try later', 'error');
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    this.getAllPendingApprovals();
  }
  remarks;
  updateClaimApprovalForm ={
    claimApprovalId:"",
    approvalStatus: "",
    remarks:""

  }
  seeDetail(claimId): void {
    this.standardService.getClaimById(claimId).subscribe(
      (data)=>{
        // console.log(data);
        this.claim = data;
        this.router.navigate(['admin/events'], {
          queryParams: { forApproval: true, eventId: this.claim.eventId }
        });
      },(error)=>{
        Swal.fire('Error!! ', 'Somethin Went wrong Please try later', 'error');
      }
    );
    
  }
  claimApprovalUpdate(updateClaimApprovalForm){
    this.standardService.claimApprovalUpdate(updateClaimApprovalForm).subscribe(
      (data)=>{
        this._snack.open('Claim Updated ', '', {
          duration: 3000,
        });
        this.updateClaimApprovalForm ={
          claimApprovalId:"",
          approvalStatus: "",
          remarks:""
      
        }
        this.approvalList = this.approvalList.filter((ap) => ap.id != updateClaimApprovalForm.claimApprovalId);
      },(error)=>{
        Swal.fire('Error!! ', 'Somethin Went wrong Please try later', 'error');
      }
    );
  }

  rejectRequest(claimApprovalId){
    this.updateClaimApprovalForm.claimApprovalId = claimApprovalId;
    this.updateClaimApprovalForm.approvalStatus = "REJECTED";
    // console.log("this si form in reject ",this.updateClaimApprovalForm);
    this.claimApprovalUpdate(this.updateClaimApprovalForm);
  }

  approveRequest(claimApprovalId){
    this.updateClaimApprovalForm.claimApprovalId = claimApprovalId;
    this.updateClaimApprovalForm.approvalStatus = "APPROVED";
    // console.log("this si form in APPROVED ",this.updateClaimApprovalForm);
    this.claimApprovalUpdate(this.updateClaimApprovalForm);
  }

}
