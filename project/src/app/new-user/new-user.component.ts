import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user = new User();
  
  constructor(private userService: UserService, private location: Location) { }
  addUser(user: User) {
    this.userService.addUser(user);
    this.location.back();
  }
  ngOnInit() {
  }

}
