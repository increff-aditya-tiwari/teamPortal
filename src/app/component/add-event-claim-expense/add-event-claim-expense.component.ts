import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StandardService } from 'src/app/service/standard/standard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event-claim-expense',
  templateUrl: './add-event-claim-expense.component.html',
  styleUrls: ['./add-event-claim-expense.component.css']
})
export class AddEventClaimExpenseComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute,private standardService:StandardService,private _snack:MatSnackBar) { }
  claimId;
  eventId;
  expenseForm = {
    invoiceNo:"",
    invoiceDate:"",
    expenseAmount:"",
    attachment:"",
    description:"",
    claimId:""
  }

  ngOnInit(): void {
    this.eventId = this.activeRoute.snapshot.params.eventId;
    this.claimId = this.activeRoute.snapshot.params.claimId;
  }

 
  addExpense(){
    this.expenseForm.claimId = this.claimId;
    console.log("this is expense form",this.expenseForm)
    this.standardService.addExpense(this.expenseForm).subscribe(
      (data)=>{
        this._snack.open('Expense Added ', '', {
          duration: 3000,
        });
      },
      (error)=>{
        Swal.fire('Something Went Wrong!! ', error.error, 'error');
      }
    )
  }

  onFileSelected(event:any){
    console.log(event.target.files[0].name);
    this.expenseForm.attachment=event.target.files[0].name;
  }


  
}
