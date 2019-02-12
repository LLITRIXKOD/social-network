import {UserService} from './user.service';
import {User} from './user';
import {defer} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';


describe('UserService', () => {
  let userService: UserService;
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userService = new UserService(<any>httpClientSpy);
  });

  it('should return expected users (HttpClient called once)', () => {
    const expectedUsers: User[] =
      [{
        id: 1,
        firstName: 'A',
        lastName: 'Aa',
        birthday: new Date('1998-12-12'),
        vacation: {
          from: 'trt',
          to: 'sfgdf'
        },
        file: 'vf',
        education: []
      },
        {
          id: 2,
          firstName: 'B',
          lastName: 'Bb',
          birthday: new Date('1998-11-11'),
          vacation: {
            from: '123',
            to: '43'
          },
          file: '54',
          education: []
        }];

    httpClientSpy.get.and.returnValue(asyncData(expectedUsers));

    userService.loadUsers().subscribe (
      users => expect(users).toEqual(users, 'expected users'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
  export function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
