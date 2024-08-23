import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/service/userService/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = null;

  // constructor(public login: LoginService) {}
  constructor(public userService:UserService,public router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.user = this.userService.getUser();
    // console.log("user updated")
    this.userService.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.userService.isLoggedIn();
      this.user = this.userService.getUser();
    });
  }
  notifications =5;
  public logout() {
    this.userService.logout();
    this.router.navigate(['login']);
    this.userService.loginStatusSubject.next(false);
  }

}
