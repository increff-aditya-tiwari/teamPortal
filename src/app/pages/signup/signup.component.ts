import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/userService/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar,public router: Router) {}
  // constructor(private snack: MatSnackBar) {}

  public user = {
    username: '',
    password: '',
    fullName: '',
    email: '',
    contactNo: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('User is required !!');
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      // alert('User is required !!');
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    //validate

    //addUser: userservice
    this.userService.createUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        // alert('user created please login');
        Swal.fire('Successfully done !!', 'Username is ' + data.username, 'success');
        this.router.navigate(['login'])
      },
      (error) => {
        //error
        console.log("somenthing went wrong",error);
        // alert('something went wrong');
        this.snack.open(error.error, '', {
          duration: 3000,
        });
      }
    );
  }

}
