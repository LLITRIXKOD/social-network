import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {Validators, FormBuilder, FormArray, FormGroup} from '@angular/forms';
import {User} from '../../user';
import {DateValidator} from '../../forbidden-date-validator';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

interface Specialty {
  name: string;
  code: string;
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  public checked: boolean = false;
  // public selectedSpecialty: Specialty;
  public todayDate: string;
  public imageSrc: string = null;
  public newUserForm: FormGroup = this.fb.group({
    id: [''],
    firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    birthday: [null, [Validators.required, DateValidator.below()]],
    vacation: this.fb.group({
      from: [''],
      to: [''],
    }, {validator: DateValidator.compareFromTo}),
    file: [''],
    education: this.fb.array([
      this.fb.control('')
    ]),
  });
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder,
              private route: ActivatedRoute, private toastr: ToastrService) {
    this.todayDate = new Date().toISOString().split('T')[0];
  }
  ngOnInit(): void {
    this.checked = !!this.route.snapshot.queryParams.check;
    const id: number = +this.route.snapshot.paramMap.get('id');
    if (id !== 0) {
      this.getUser(id);
    }
    this.newUserForm.valueChanges.subscribe(value => {
      console.log('OLOLO');
    });
  }
  public pickVacationToDate(): string {
    return this.newUserForm.value.vacation.to;
  }
  public pickVacationFromDate(): string {
    return this.newUserForm.value.vacation.from || this.todayDate;
  }
  public onSubmit(): void {
    if (this.newUserForm.value.id) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }
  public checkValue(controlName: string): boolean {
    return (this.newUserForm.get(controlName).dirty || this.newUserForm.get(controlName).touched)
      && this.newUserForm.get(controlName).invalid;
  }
  public onFileChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      const reader: FileReader = new FileReader();

      reader.onloadend = e => {
        this.imageSrc = reader.result.toString();
      };
      reader.readAsDataURL(file);
    }
  }
  public addEducation(): void {
    this.education.push(this.fb.control(''));
  }
  public deleteEducation(): void {
    this.education.removeAt(this.education.length - 1);
  }
  public addQuery(event: any): void {
    if (event.target.checked) {
      this.router.navigate([], {queryParams: {check: 'true'}});
    } else {
      this.router.navigate([]);
    }
  }
  public today(): Date {
    return new Date(this.todayDate);
  }
  private get education(): FormArray {
    return this.newUserForm.get('education') as FormArray;
  }
  private getUser(id: number): void {
    this.userService.getUser(id).subscribe((user) => {
      Object.keys(this.newUserForm.controls).forEach((item) => {
        if (item === 'birthday') {
          this.newUserForm.controls.birthday.setValue(new Date(user.birthday));
        } else if (item === 'file') {
          this.imageSrc = user[item];
        } else {
          this.newUserForm.controls[item].setValue(user[item]);
        }
      });
    });
  }
  private updateUser(): void {
    const user: User = this.newUserForm.value;
    this.userService.updateUser(user).subscribe(() => {
      this.router.navigateByUrl('/display/all');
      this.toastr.success('', 'User successfully update', {timeOut: 3000, positionClass: 'toast-bottom-right'});
    });
  }
  private addUser(): void {
    const user: User = this.newUserForm.value;
    user.file = this.imageSrc;
    this.userService.addUser(user).subscribe(() => {
      this.toastr.success('', 'User successfully add', {timeOut: 3000, positionClass: 'toast-bottom-right'});
      this.router.navigateByUrl('/display/all');
    });
  }
}

