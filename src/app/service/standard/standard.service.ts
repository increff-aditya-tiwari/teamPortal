import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/backend-details';
import { UserService } from '../userService/user.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  constructor(private http : HttpClient,private userService:UserService) { }

  
  // public addClaim(eventId){
  //   return this.http.post(`${baseUrl}/add-claim/${eventId}`,null)
  // }

  // public claimApprovalUpdate(updateClaimApprovalForm){
  //   return this.http.post(`${baseUrl}/claim-approval-update`,updateClaimApprovalForm)
  // }

  // public getEventClaims(eventId){
  //   return this.http.get(`${baseUrl}/get-event-claims/${eventId}`)
  // }
  
  // public getClaimExpenses(claimId){
  //   return this.http.get(`${baseUrl}/get-claim-expenses/${claimId}`)
  // }
  
  // public addExpense(addExpenseFrom){
  //   return this.http.post(`${baseUrl}/add-expense`,addExpenseFrom)
  // }

  public addFileExpense(addExpenseFrom){
    return this.http.post(`${baseUrl}/add-file-expense`,addExpenseFrom)
  }
  // public removeExpense(expenseId){
  //   return this.http.post(`${baseUrl}/remove-expense/${expenseId}`,null)
  // }
  public notifyUser(){
    return this.http.post(`${baseUrl}/notify`,null)
  }

  // public getAllClaimApprovals(claimId){
  //   return this.http.get(`${baseUrl}/get-claim-approvals/${claimId}`)
  // }

  // public getExpenseById(expenseId){
  //   return this.http.get(`${baseUrl}/get-expense/${expenseId}`)
  // }

  public getFileExpenseById(expenseId){
    return this.http.get(`${baseUrl}/get-file-expense/${expenseId}`)
  }

  // public updateExpense(expense){
  //   return this.http.post(`${baseUrl}/update-expense`,expense,{withCredentials:true})
  // }

  // public getAllPendingApprovals(){
  //   return this.http.get(`${baseUrl}/get-pending-claim-approval`)
  // }

  // public getClaimById(claimId){
  //   return this.http.get(`${baseUrl}/get-claim/${claimId}`)
  // }

  // public getAllNotificatioForUser(userId){
  //   return this.http.get(`${baseUrl}/get-all-notification/${userId}`)
  // }

  // downloadFile(expenseId) {
  //   return this.http.get(`${baseUrl}/download-file/${expenseId}`, {
  //     responseType: 'blob',
  //     observe: 'response'
  //   });
  // }
}
