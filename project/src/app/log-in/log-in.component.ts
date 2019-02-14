import { Component } from '@angular/core';
import {UserService} from '../user.service';
import {UserOfSystem} from '../user-of-system';
import {AuthLoginGuard} from '../auth-login.guard';
import {AuthIsAdminGuard} from '../auth-is-admin.guard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  public email: string;
  public password: string;
  constructor(private userService: UserService, private login: AuthLoginGuard, private admin: AuthIsAdminGuard, private router: Router ) { }
  public onSubmit(): void {
    const user: UserOfSystem = new UserOfSystem(this.email, this.password);
    this.userService.logInUser(user).subscribe(findUser => {
      if (!!findUser[0]) {
        if (findUser[0].role === 'admin') {
          this.admin.isAdmin = true;
        }
        this.login.userLoggedIn = true;
        this.router.navigateByUrl('/display/all');
      } else {
        console.log('are not logged in');
      }
    });
  }
}
