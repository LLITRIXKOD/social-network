import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {AuthLoginGuard} from '../auth-login.guard';
import {AuthIsAdminGuard} from '../auth-is-admin.guard';

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css']
})
export class CapComponent {
  public search: string;

  constructor(private userService: UserService, private loginGuard: AuthLoginGuard, private adminGuard: AuthIsAdminGuard) {
  }

  public onSubmit(): void {
    this.userService.filterUsers(this.search);
  }

  showAll(): void {
    this.userService.filterUsers('');
    this.search = '';
  }
}
