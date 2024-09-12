import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/backend-details';
import { UserService } from '../userService/user.service';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http : HttpClient,private userService:UserService) { }

  expenseBaseUrl = baseUrl + '/expense';

  public addExpense(addExpenseFrom){
    return this.http.post(`${this.expenseBaseUrl}/add`,addExpenseFrom)
  }

  public removeExpense(expenseId){
    return this.http.post(`${this.expenseBaseUrl}/remove/${expenseId}`,null)
  }

  public getExpenseById(expenseId){
    return this.http.get(`${this.expenseBaseUrl}/get/${expenseId}`)
  }

  public updateExpense(expense){
    return this.http.post(`${this.expenseBaseUrl}/update`,expense,{withCredentials:true})
  }

  downloadFile(expenseId) {
    return this.http.get(`${this.expenseBaseUrl}/download-file/${expenseId}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }

}
