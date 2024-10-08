import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HTTP_INTERCEPTORS,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
import { UserService } from '../userService/user.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      //add the jwt token (localStorage) request
      let authReq = req;
      const token = this.userService.getToken();
    //   console.log('inside interceptor');
  
      if (token != null) {
        authReq = authReq.clone({
          setHeaders: { 'Authorization': `Bearer ${token}` },
          withCredentials:true
        });
      }
      return next.handle(authReq);
    }
  }
  
  export const authInterceptorProviders = [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ];
  