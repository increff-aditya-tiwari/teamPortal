import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../userService/user.service';
import baseUrl from '../helper/backend-details';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http : HttpClient,private userService:UserService) { }
  public eventInviteRequest = new BehaviorSubject<Object>(null);

  eventBaserUrl = baseUrl +'/event';

  public addEvent(quiz) {
    console.log(this.eventBaserUrl);
    return this.http.post(`${this.eventBaserUrl}/create`, quiz);
  }

  public getAllEvents() {
    return this.http.get(`${this.eventBaserUrl}/get-all`,{withCredentials:true});
  }
  
  public mapEventParticipant(mapEventParticipantForm){
    return this.http.post(`${this.eventBaserUrl}/invite-participant`,mapEventParticipantForm)
  }

  public joinEvent(mapEventParticipantForm){
    return this.http.post(`${this.eventBaserUrl}/join-request`,mapEventParticipantForm)
  }

  public allRequestForEvent(eventId){
    return this.http.get(`${this.eventBaserUrl}/get-all-requests/${eventId}`)
  }

  public allInvitesFromEvent(eventId){
    return this.http.get(`${this.eventBaserUrl}/get-all-invites/${eventId}`)
  }

  public updateEventJoinRequest(updateRequestForm){
    return this.http.post(`${this.eventBaserUrl}/join-request-update`,updateRequestForm)
  }

  public getEventParticipants(eventId) {
    return this.http.get(`${this.eventBaserUrl}/get-all-participants/${eventId}`);
  }

  public removeEventParticipant(deleteEventParticipantFrom) {
    return this.http.post(`${this.eventBaserUrl}/remove-participant`,deleteEventParticipantFrom);
  }

  public getParticipantEventList(participantId){
    return this.http.get(`${this.eventBaserUrl}/get-all-events-for-participants/${participantId}`)
  }

  public getEventByEventId(eventId){
    return this.http.get(`${this.eventBaserUrl}/get/${eventId}`)
  }
}
