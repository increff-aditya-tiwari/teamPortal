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
  private webSocket: WebSocket;
  notificationsList = [];
  formSubmit  ()  {
    // console.log(this.loginData);

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

    this.userService.userLogin(this.loginData).subscribe(
      (user: any) => {
        // console.log('success');
        console.log(user);
        

        // login...
        this.userService.setUserToken(user.jwtToken);
        this.userService.setUser(user);
        this.userService.loginStatusSubject.next(true);
        let access = this.userService.getUserAccess()
        document.cookie = `jwtToken=${user.jwtToken}`;
        const hasNormalAuthority = access.some(auth => auth.authority === "normal");
        if(hasNormalAuthority){
          this.router.navigate(['admin/teams']);
        }else{
          
          this.router.navigate(['user-dashboard']);
        }
        // this.webSocket = new WebSocket(`ws://localhost:8080/send-notification/${user.jwtToken}`);
        // this.webSocket.onmessage = (event) => {
        //   // console.log("this is data ",event.data);
        //   this.notificationsList.push(JSON.parse(event.data));
        //   // this.notifications
        //   console.log("this is stock data ", this.notificationsList)
        // };
      },
      (error) => {
        console.log("call failed")
        console.log('Error !');
        console.log(error.error);
        this.snack.open(error.error.message, '', {
          duration: 3000,
        });
      }
    );
  }

}
