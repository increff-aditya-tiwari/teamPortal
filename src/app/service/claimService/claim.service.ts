import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/backend-details';
import { UserService } from '../userService/user.service';
import { shareReplay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http : HttpClient,private userService:UserService) { }
  public claimApprovalStatus = new BehaviorSubject<Object>(null);

  claimBaseUrl = baseUrl + '/claim';

  public addClaim(eventId){
    return this.http.post(`${this.claimBaseUrl}/add/${eventId}`,null)
  }

  public claimApprovalUpdate(updateClaimApprovalForm){
    return this.http.post(`${this.claimBaseUrl}/approval-update`,updateClaimApprovalForm)
  }

  public getEventClaims(eventId){
    return this.http.get(`${this.claimBaseUrl}/get-all/${eventId}`)
  }

  public getClaimExpenses(claimId){
    return this.http.get(`${this.claimBaseUrl}/get-all-expense/${claimId}`)
  }

  public getAllClaimApprovals(claimId){
    return this.http.get(`${this.claimBaseUrl}/get-all-approval/${claimId}`)
  }

  public getAllPendingApprovals(){
    return this.http.get(`${this.claimBaseUrl}/get-all-pending-approval`)
  }

  public getClaimById(claimId){
    return this.http.get(`${this.claimBaseUrl}/get/${claimId}`)
  }
}
