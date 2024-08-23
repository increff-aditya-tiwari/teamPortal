import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(public user : UserService) { }

  ngOnInit(): void {
  }

}
