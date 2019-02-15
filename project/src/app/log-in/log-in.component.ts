import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserOfSystem} from '../user-of-system';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router ) { }
  ngOnInit(): void {
    this.authService.loggedIn = false;
    this.authService.isAdmin = false;
  }

  public onSubmit(): void {
    const user: UserOfSystem = new UserOfSystem(this.email, this.password);
    this.userService.logInUser(user).subscribe(findUser => {
      if (!!findUser[0]) {
        if (findUser[0].role === 'admin') {
          this.authService.isAdmin = true;
        }
        this.authService.loggedIn = true;
        this.router.navigateByUrl('/display/all');
      } else {
        console.log('are not logged in');   /*TODO: message*/
      }
    });
  }
}
