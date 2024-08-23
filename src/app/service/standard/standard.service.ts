import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/backend-details';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  constructor(private http : HttpClient,private userService:UserService) { }

  public getAllTeams() {
    return this.http.get(`${baseUrl}/get-teams`);
  }

  //add new Team
  public addTeam(team) {
    return this.http.post(`${baseUrl}/create-team`, team);
  }

  public addEvent(quiz) {
    return this.http.post(`${baseUrl}/create-event`, quiz);
  }

  public getAllEvents() {
    return this.http.get(`${baseUrl}/get-events`);
  }
  
  public getTeamMembers(teamId) {
    return this.http.get(`${baseUrl}/get-team-members/${teamId}`);
  }

  public getUserTeamList(userId){
    
    return this.http.get(`${baseUrl}/get-user-teams/${userId}`)
  }

  public removeTeamMember(deleteTeamMemberFrom) {
    return this.http.post(`${baseUrl}/remove-team-member`,deleteTeamMemberFrom);
  }
h
  public mapUserTeam(mapUserTeamForm){
    return this.http.post(`${baseUrl}/map-user-team`,mapUserTeamForm)
  }

  public joinTeam(mapUserTeamForm){
    return this.http.post(`${baseUrl}/join-team`,mapUserTeamForm)
  }
  
  public getEventParticipants(eventId) {
    return this.http.get(`${baseUrl}/get-event-participants/${eventId}`);
  }
  public mapEventParticipant(mapEventParticipantForm){
    return this.http.post(`${baseUrl}/map-event-participant`,mapEventParticipantForm)
  }
  public joinEvent(mapEventParticipantForm){
    return this.http.post(`${baseUrl}/join-event`,mapEventParticipantForm)
  }
  public getParticipantEventList(participantId){
    
    return this.http.get(`${baseUrl}/get-participant-events/${participantId}`)
  }

  public removeEventParticipant(deleteEventParticipantFrom) {
    return this.http.post(`${baseUrl}/remove-event-participant`,deleteEventParticipantFrom);
  }

  public allRequestForTeam(teamId){
    return this.http.get(`${baseUrl}/team-join-requests/${teamId}`)
  }
  
  public updateTeamJoinRequest(updateRequestForm){
    return this.http.post(`${baseUrl}/team-join-request-update`,updateRequestForm)
  }

  public allRequestForEvent(eventId){
    return this.http.get(`${baseUrl}/event-join-requests/${eventId}`)
  }
  
  public updateEventJoinRequest(updateRequestForm){
    return this.http.post(`${baseUrl}/event-join-request-update`,updateRequestForm)
  }
  
  public addClaim(eventId){
    return this.http.post(`${baseUrl}/add-claim/${eventId}`,null)
  }

  public claimApprovalUpdate(updateClaimApprovalForm){
    return this.http.post(`${baseUrl}/claim-approval-update`,updateClaimApprovalForm)
  }

  public getEventClaims(eventId){
    return this.http.get(`${baseUrl}/get-event-claims/${eventId}`)
  }
  
  public getClaimExpenses(claimId){
    return this.http.get(`${baseUrl}/get-claim-expenses/${claimId}`)
  }
  
  public addExpense(addExpenseFrom){
    return this.http.post(`${baseUrl}/add-expense`,addExpenseFrom)
  }
  public removeExpense(expenseId){
    return this.http.post(`${baseUrl}/remove-expense/${expenseId}`,null)
  }

  public getAllClaimApprovals(claimId){
    return this.http.get(`${baseUrl}/get-claim-approvals/${claimId}`)
  }

  public getExpenseById(expenseId){
    return this.http.get(`${baseUrl}/get-expense/${expenseId}`)
  }

  public getFileExpenseById(expenseId){
    return this.http.get(`${baseUrl}/get-file-expense/${expenseId}`)
  }

  public updateExpense(expense){
    return this.http.post(`${baseUrl}/update-expense`,expense)
  }

  public getAllPendingApprovals(){
    return this.http.get(`${baseUrl}/get-pending-claim-approval`)
  }

  public getClaimById(claimId){
    return this.http.get(`${baseUrl}/get-claim/${claimId}`)
  }

  public getEventByEventId(eventId){
    return this.http.get(`${baseUrl}/get-event/${eventId}`)
  }
}
