import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CapComponent} from './cap/cap.component';
import {CellarComponent} from './cellar/cellar.component';
import {UsersComponent} from './display-users/users/users.component';
import {UserDetailComponent} from './display-users/user-detail/user-detail.component';
import {NewUserComponent} from './create-users/new-user/new-user.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
          CapComponent,
          CellarComponent,
          UsersComponent,
          UserDetailComponent,
          NewUserComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('project');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to project!');
  });
});
