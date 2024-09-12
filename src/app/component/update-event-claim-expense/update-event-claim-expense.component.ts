import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/service/expenseService/expense.service';
import { StandardService } from 'src/app/service/standard/standard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-event-claim-expense',
  templateUrl: './update-event-claim-expense.component.html',
  styleUrls: ['./update-event-claim-expense.component.css']
})
export class UpdateEventClaimExpenseComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute,
    private standardService:StandardService,
    private expenseService : ExpenseService,
    private _snack:MatSnackBar,
    private router: Router) { }
  expenseId;
  eventId;
  claimId;
  expense;
  getExpenseById(){
    this.expenseService.getExpenseById(this.expenseId).subscribe(
      (data: any) => {
        
        this.expense = data;
        console.log(this.expense);
      },
      (error) => {
        Swal.fire('Error!! ', 'Somethin Went wrong Please try later', 'error');
        console.log(error);
      }
    );
  }
  ngOnInit(): void {

    this.expenseId = this.activeRoute.snapshot.params.expenseId;
    this.eventId = this.activeRoute.snapshot.params.eventId;
    this.claimId = this.activeRoute.snapshot.params.claimId;
    this.getExpenseById();
     console.log(this.expense)
  }

  updateExpense(){
    console.log(this.expense);
    this.expenseService.updateExpense(this.expense).subscribe(
      (data) => {
        this._snack.open('Expense Updated ', '', {
          duration: 3000,
        });
        
        // this.router.navigate[`/admin/view-event-claim-expenses/'+ ${this.eventId} + '/' + ${this.claimId}`]
      },

      (error) => {
        Swal.fire('Something Went Wrong!! ', error.error, 'error');
      }
    );
  }

  onFileSelected(event:any){
    console.log(event.target.files[0].name);
    this.expense.attachment=event.target.files[0].name;
  }
}
