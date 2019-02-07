import { Component, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '../user';
import { DateValidator } from '../forbidden-date-validator';

const defaultProfilePicture = 'https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  todayDate: string;


  newUserForm = this.fb.group({
    id: [''],
    firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    birthday: ['', [Validators.required, DateValidator.below()]],
    vacation: this.fb.group({
      from: [''],
      to: [''],
    }, { validator: DateValidator.compareFromTo }),
    photoUrl: [''],
  });
  pickVacationToDate(): string {
    return this.newUserForm.value.vacation.to;
  }
  pickVacationFromDate(): string {
    return this.newUserForm.value.vacation.from || this.todayDate;
  }
  constructor(private userService: UserService, private location: Location, private fb: FormBuilder) {
    this.todayDate = new Date().toISOString().split('T')[0];
  }
  onSubmit() {
    const user: User = this.newUserForm.value;
    if(!user.photoUrl.trim()) {
      user.photoUrl = defaultProfilePicture;
    }
    this.userService.addUser(user).subscribe(_ => {
      this.location.back();
    });
  }
  checkValue(controlName: string) {
    return (this.newUserForm.get(controlName).dirty || this.newUserForm.get(controlName).touched)  && this.newUserForm.get(controlName).invalid
  }
}
