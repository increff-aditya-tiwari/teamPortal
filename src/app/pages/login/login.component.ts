import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.loginData);

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    // // request to server to generate token
    this.userService.userLogin(this.loginData).subscribe(
      (user: any) => {
        console.log('success');
        console.log(user);
        this.userService.loginStatusSubject.next(true);

        // login...
        this.userService.setUserToken(user.jwtToken);
        this.userService.setUser(user);
        let access = this.userService.getUserAccess()
        const hasAdminAuthority = access.some(auth => auth.authority === "admin");
        if(hasAdminAuthority){
          this.router.navigate(['admin/teams']);
          this.userService.loginStatusSubject.next(true);
        }else{
          
          this.router.navigate(['user-dashboard']);
          this.userService.loginStatusSubject.next(true);
        }
      },
      (error) => {
        console.log("call failed")
        console.log('Error !');
        console.log(error);
        this.snack.open(error.error, '', {
          duration: 3000,
        });
      }
    );
  }

}
