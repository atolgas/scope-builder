import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string;
  email: string;
  id: string;
  user: any;
  users: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.user['userName'];
    this.users = this.userService.getAll().subscribe();
    console.log(this.users);
  }

}
