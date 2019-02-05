import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  newUserForm =this.fb.group({
    id: [''],
    firstName: [''],
    lastName: [''],
    birthday: [''],
    vacation: this.fb.group({
      from: [''],
      to: [''],
    }),
    photoUrl: [''],
  });

  constructor(private userService: UserService, private location: Location, private fb: FormBuilder) { }
  addUser() {
    const user = this.newUserForm.value;
    this.userService.addUser(user).subscribe(_ => {
      this.location.back();
    });
  }
}
