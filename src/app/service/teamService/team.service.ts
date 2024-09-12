import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';
import baseUrl from '../helper/backend-details';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http : HttpClient,private userService:UserService) { }
  teamBaseUrl = baseUrl + "/team";

  public getAllTeams() {
    return this.http.get(`${this.teamBaseUrl}/getAll`);
  }

  public addTeam(team) {
    return this.http.post(`${this.teamBaseUrl}/create`, team);
    
  }

  public getTeamMembers(teamId) {
    return this.http.get(`${this.teamBaseUrl}/get-members/${teamId}`);

  }

  public getUserTeamList(userId){
    
    return this.http.get(`${this.teamBaseUrl}/get-user-teamIds/${userId}`)
  }

  public removeTeamMember(deleteTeamMemberFrom) {
    return this.http.post(`${this.teamBaseUrl}/remove-member`,deleteTeamMemberFrom);
  }
h
  public mapUserTeam(mapUserTeamForm){
    return this.http.post(`${this.teamBaseUrl}/invite-user`,mapUserTeamForm)
  }

  public joinTeam(mapUserTeamForm){
    return this.http.post(`${this.teamBaseUrl}/join-request`,mapUserTeamForm)
  }

  public allRequestForTeam(teamId){
    return this.http.get(`${this.teamBaseUrl}/join-requests/${teamId}`)
  }

  public allInvitesFromTeam(teamId){
    return this.http.get(`${this.teamBaseUrl}/join-invites/${teamId}`)
  }
  
  public updateTeamJoinRequest(updateRequestForm){
    return this.http.post(`${this.teamBaseUrl}/join-request-update`,updateRequestForm)
  }

  public getTeamByTeamId(teamid){
    return this.http.get(`${this.teamBaseUrl}/get/${teamid}`)
  }
}
