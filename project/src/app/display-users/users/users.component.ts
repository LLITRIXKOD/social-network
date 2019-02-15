import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private pickUser: User = null;
  users: User[];
  private usersSubscription: Subscription;
  constructor(private userService: UserService, private spinner: NgxSpinnerService, private modalService: NgbModal) {}
  async ngOnInit(): Promise<any> {
    this.usersSubscription = this.userService.users$.subscribe(users => {
      this.users = users;
    });
    this.spinner.show();

    await this.userService.loadUsers().toPromise();
    this.spinner.hide();
  }
  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
  public delete(): void {
    this.users = this.users.filter(u => u !== this.pickUser);
    this.userService.deleteUser(this.pickUser).subscribe();
  }
  public openModal(content: any, user: User): void {
    this.pickUser = user;
    this.modalService.open(content, {centered: true });
  }
}
