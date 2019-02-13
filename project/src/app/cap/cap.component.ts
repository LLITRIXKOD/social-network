import {Component} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css']
})
export class CapComponent {
  public search: string;

  constructor(private userService: UserService) {
  }

  public onSubmit(): void {
    this.userService.filterUsers(this.search);
  }

  showAll(): void {
    this.userService.filterUsers('');
    this.search = '';
  }
}
