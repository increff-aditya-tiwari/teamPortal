import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';
import { FilePreviewComponent } from '../file-preview/file-preview.component';
import { ClaimService } from 'src/app/service/claimService/claim.service';
import { ExpenseService } from 'src/app/service/expenseService/expense.service';

@Component({
  selector: 'app-view-event-claim-expense',
  templateUrl: './view-event-claim-expense.component.html',
  styleUrls: ['./view-event-claim-expense.component.css']
})
export class ViewEventClaimExpenseComponent implements OnInit {

  eventOrganiser;
  claimId;
  forApproval;
  currentUser;
  constructor(
    private userService : UserService, 
    private activeRoute:ActivatedRoute,
    private standardService : StandardService,
    private expenseService : ExpenseService,
    private claimSerivice : ClaimService,
    private _snack:MatSnackBar,
    private dialog: MatDialog
    
  ) { }

  expenseList = []
  getAllClaimExpenses(){
    this.claimSerivice.getClaimExpenses(this.claimId).subscribe(
      (data: any) => {
        
        this.expenseList = data;
        console.log(this.expenseList);
      },
      (error) => {
        Swal.fire('Error!! ', 'Somethin Went wrong Please try later', 'error');
        console.log(error);
      }
    );
  }
  imagePreviewUrl:any;
  previewImage(fileBytes) {
    // console.log("this is filbyte ",fileBytes)
    const blob = new Blob([fileBytes], { type: 'image/png' });
    console.log("this is blob ",blob)
    const reader = new FileReader();
    console.log("converting to image ",this.imagePreviewUrl)
    reader.onload = (res) => {
      console.log(res.target.result)
      console.log("converting to image ",this.imagePreviewUrl)
      this.imagePreviewUrl = res.target.result;
    };
    reader.readAsDataURL(blob);
  }
  openFilePreview(expense) {

    // const dialogRef = this.dialog.open(FilePreviewComponent, {
    //   data: {
    //     expense
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // if (result === 'download') {
    //   //   const link = document.createElement('a');
    //   //   link.href = url;
    //   //   link.download = fileName;
    //   //   link.click();
    //   //   window.URL.revokeObjectURL(url);
    //   // }
    // });

    this.expenseService.downloadFile(expense.expenseId).subscribe(response => {
      console.log("we are in the response")
      const blob = new Blob([response.body], { type: response.headers.get('Content-Type') });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      console.log("this is url " , url)

      // Open the dialog
      const dialogRef = this.dialog.open(FilePreviewComponent, {
        data: {
          expense
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'download') {
          const link = document.createElement('a');
          link.href = url;
          link.download = expense.attachmentFileName;
          link.click();
          window.URL.revokeObjectURL(url);
        }
      });
    });
  }
  // getFileExpense(){
  //   this.standardService.getFileExpenseById(1).subscribe(
  //     (data: any) => {
        
  //       this.expenseList.push(data)
  //       console.log(this.expenseList);
  //     },
  //     (error) => {
  //       Swal.fire('Error!! ', 'Somethin Went wrong Please try later', 'error');
  //       console.log(error);
  //     }
  //   );
  // }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.forApproval = params['forApproval'];
    });
    this.eventOrganiser = this.activeRoute.snapshot.params.eventOrganiser;
    this.claimId = this.activeRoute.snapshot.params.claimId;
    this.currentUser = this.userService.getUser().userId;
    console.log(this.claimId,this.eventOrganiser)
    this.getAllClaimExpenses();
    // this.getFileExpense()
  }

  removeClaimExpense(expenseId) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure , want to remove this Expense?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confim
        this.expenseService.removeExpense(expenseId).subscribe(
          (data) => {
            this._snack.open('Expense Removed ', '', {
              duration: 3000,
            });
            this.expenseList = this.expenseList.filter((ex) => ex.expenseId != expenseId);
          },

          (error) => {
            this._snack.open('Error in removing Expense', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }
  
}
