import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.scss']
})
export class CapComponent {
  public dropdown = false;
  public search: string;

  constructor(private userService: UserService, private authService: AuthService) {
  }

  public onSubmit(): void {
    this.userService.filterUsers(this.search);
  }

  showAll(): void {
    this.userService.filterUsers('');
    this.search = '';
  }
}
