import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = null;
  constructor(private login: UserService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
  }

}
