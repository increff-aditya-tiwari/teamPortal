import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';

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
  constructor(private userService : UserService, private activeRoute:ActivatedRoute,private standardService : StandardService,private _snack:MatSnackBar) { }

  expenseList = []
  getAllClaimExpenses(){
    this.standardService.getClaimExpenses(this.claimId).subscribe(
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
        this.standardService.removeExpense(expenseId).subscribe(
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
