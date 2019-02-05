import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.getUsers();
    // setTimeout(_ => {
    //   this.getUsers();
    // }, 1000);
  }
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }
  getUsers() {
    this.userService.getUsers()
      .subscribe((users) => {
        this.users = users;
      });
  }
}
