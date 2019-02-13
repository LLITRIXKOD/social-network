import { async, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import {User} from '../user';
import {ActivatedRouteStub} from '../../testing/activated-route-stub';
import {createComponent} from '@angular/compiler/src/core';

describe('UserDetailComponent', () => {
  let expectedUser: User;
  let activatedRouter: ActivatedRouteStub;

  beforeEach(async(() => {
    expectedUser = {
      id: 2,
      firstName: 'Igor',
      lastName: 'Stefanovich',
      birthday: new  Date('1999-02-04T00:00:00.000Z'),
      vacation: {
        from: '2019-03-11',
        to: '2019-03-22'
      },
      education: [
        'BSUIR'
      ],
      file: ''
    };
    activatedRouter.setParamMap({id: expectedUser.id});
    createComponent();
    TestBed.configureTestingModule({
      imports: [ActivatedRouteStub],
      declarations: [ UserDetailComponent ]
    })
    .compileComponents();
  }));
});
