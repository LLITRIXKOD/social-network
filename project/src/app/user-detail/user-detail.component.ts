import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  router: Router;
  haveVacation = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    router: Router
  ) {
    this.router = router;
  }

  public getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        if (this.user.vacation.from && this.user.vacation.to) {
          this.haveVacation = true;
        }
      });
  }
  public updateUser() {
    this.router.navigateByUrl(`/update/${this.user.id}`);
  }
  ngOnInit() {
    this.getUser();
  }
}
