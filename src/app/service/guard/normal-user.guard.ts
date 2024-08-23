import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class NormalUserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let access = this.userService.getUserAccess()
      const hasAdminAuthority = access.some(auth => auth.authority === "admin");
    if (this.userService.isLoggedIn() && !hasAdminAuthority) {
      // this.router.navigate(['user-dashboard']);
      return true
      }
      this.router.navigate(['login']);
      return false;
  }

}
