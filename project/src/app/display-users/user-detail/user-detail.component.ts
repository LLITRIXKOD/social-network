import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../user.service';
import {User} from '../../user';
import {AuthIsAdminGuard} from '../../auth-is-admin.guard';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  haveVacation: boolean;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private adminGuard: AuthIsAdminGuard) {
      this.haveVacation = false;
  }

  public getUser(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        if (this.user.vacation.from && this.user.vacation.to) {
          this.haveVacation = true;
        }
      });
  }
  public updateUser(): void {
    this.router.navigateByUrl(`/create/update/${this.user.id}`);
  }
  ngOnInit(): void {
    this.getUser();
  }
}
