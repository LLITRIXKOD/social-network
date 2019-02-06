import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  private usersSubscription: Subscription;
  constructor(private userService: UserService, private spinner: NgxSpinnerService) {}

  async ngOnInit() {
    this.usersSubscription = this.userService.users$.subscribe(users => {
      this.users = users;
    });
    this.spinner.show();

    await this.userService.loadUsers().toPromise();
    this.spinner.hide();
  }
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }
}
