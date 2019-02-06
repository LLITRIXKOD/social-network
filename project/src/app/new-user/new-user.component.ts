import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../user';

const defaultProfilePicture = 'https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg';

function forbiddenDateValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { 'forbiddenDate': { value: control.value}} : null;
  };
}

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
    birthday: ['', Validators.required],
    vacation: this.fb.group({
      from: [''],
      to: [''],
    }),
    photoUrl: [''],
  });
  pickFromDate(): string {
    let vacationFromDate = this.newUserForm.value.vacation.from || this.todayDate;
    return vacationFromDate;
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
}
