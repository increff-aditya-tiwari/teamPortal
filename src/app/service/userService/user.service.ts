import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/backend-details';
import { Subject, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public loginStatusSubject = new Subject<boolean>();


  public userLogin(loginData: any) {
    return this.http.post(`${baseUrl}/user/login`, loginData);
  }

  public setUserToken(token) {
    localStorage.setItem('token', token);

    return true;
  }

  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public removeCredentioals(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = "jwtToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
  public logout() {
    return this.http.post(`${baseUrl}/user/logout`,null);
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      // this.logout();
      return null;
    }
  }


  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserAccess() {
    let user = this.getUser();
    if(user != null){
      return user.authorities;
    }
  }

  public createUser(createUserData:any){
    return this.http.post(`${baseUrl}/user/create`, createUserData);
  }
  
  public getAllUsers(){
    return this.http.get(`${baseUrl}/user/get-all`)
  }

  public getAllNotificatioForUser(userId){
    return this.http.get(`${baseUrl}/user/get-all-notification/${userId}`)
  }
}
