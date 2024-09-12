import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from 'src/app/service/expenseService/expense.service';
import { StandardService } from 'src/app/service/standard/standard.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-event-claim-expense',
  templateUrl: './add-event-claim-expense.component.html',
  styleUrls: ['./add-event-claim-expense.component.css']
})
export class AddEventClaimExpenseComponent implements OnInit {

  constructor(
    private activeRoute:ActivatedRoute,
    private standardService:StandardService,
    private expenseService:ExpenseService,
    private _snack:MatSnackBar,
    private location: Location
  ) { }
  claimId: string;
  eventId: string;
  selectedFile: File;
  expenseForm = {
    invoiceNo:"",
    invoiceDate:"",
    expenseAmount:"",
    attachment:File,
    description:"",
    claimId:""
  }

  ngOnInit(): void {
    this.eventId = this.activeRoute.snapshot.params.eventId;
    this.claimId = this.activeRoute.snapshot.params.claimId;
  }

  addFileExpense(){
    this.expenseForm.claimId = this.claimId;
    const formData = new FormData();
    formData.append('invoiceNo', this.expenseForm.invoiceNo);
    formData.append('invoiceDate', this.expenseForm.invoiceDate);
    formData.append('expenseAmount', this.expenseForm.expenseAmount);
    formData.append('description', this.expenseForm.description);
    formData.append('claimId', this.claimId);  
    formData.append('attachmentDetail', this.selectedFile); 
    console.log("this is expense form",formData)

    this.standardService.addFileExpense(formData).subscribe(
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

 
  addExpense(){
    this.expenseForm.claimId = this.claimId;
    const formData = new FormData();
    formData.append('invoiceNo', this.expenseForm.invoiceNo);
    formData.append('invoiceDate', this.expenseForm.invoiceDate);
    formData.append('expenseAmount', this.expenseForm.expenseAmount);
    formData.append('description', this.expenseForm.description);
    formData.append('claimId', this.claimId);  
    formData.append('attachmentDetail', this.selectedFile); 
    console.log("this is expense form",formData)
    this.expenseService.addExpense(formData).subscribe(
      (data)=>{
        this._snack.open('Expense Added ', '', {
          duration: 3000,
        });
        this.expenseForm = {
          invoiceNo:"",
          invoiceDate:"",
          expenseAmount:"",
          attachment:File,
          description:"",
          claimId:""
        }
        this.location.back();
      },
      (error)=>{
        Swal.fire('Something Went Wrong!! ', error.error.message, 'error');
      }
    )
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];  // Store the selected file
    console.log('Selected file:', this.selectedFile);
  }


  
}
