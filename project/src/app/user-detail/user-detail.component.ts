import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService }  from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
  ) {}
  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }
  updateUser(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.location.back());
  }
  ngOnInit() {
    this.getUser();
  }

}
