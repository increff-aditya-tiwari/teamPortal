import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/backend-details';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public loginStatusSubject = new Subject<boolean>();


  public userLogin(loginData: any) {
    return this.http.post(`${baseUrl}/user-login`, loginData);
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

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }


  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserAccess() {
    let user = this.getUser();
    return user.authorities;
  }

  public createUser(createUserData:any){
    return this.http.post(`${baseUrl}/create-user`, createUserData);
  }
  
  public getAllUsers(){
    return this.http.get(`${baseUrl}/get-all-user`)
  }
}
