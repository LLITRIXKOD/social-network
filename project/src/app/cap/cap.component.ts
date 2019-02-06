import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css']
})
export class CapComponent {
  public search: string;
  constructor(private userService: UserService) {
  }
  onSubmit() {
    this.userService.filterUsers(this.search);
    this.search = "";
  }
  showAll() {
    this.userService.filterUsers("");
  }
}
