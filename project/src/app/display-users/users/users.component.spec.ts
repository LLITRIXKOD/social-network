import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import {UserService} from '../../user.service';
import {NgxSpinnerComponent, NgxSpinnerService} from 'ngx-spinner';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userS: UserService;
  let spinnerS: NgxSpinnerService;
  const userServiceStub = {
    loadUsers: () => {}
  };
  class SpinnerServiceStub {
    show() {}
    hide() {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent, NgxSpinnerComponent ],
      providers: [{provide: UserService, useValue: userServiceStub}, {provide: NgxSpinnerService, useClass: SpinnerServiceStub} ]
    });
  }));

  beforeEach(() => {
    userS = TestBed.get(UserService);
    spinnerS = TestBed.get(NgxSpinnerService);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should called open', () => {
  //   const openSpy = jest.spyOn(popup, 'loadUsers');
  //   fixture.detectChanges();
  //   expect(openSpy).toHaveBeenCalled();
  // });
});
