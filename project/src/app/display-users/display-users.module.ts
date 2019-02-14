import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DisplayUsersRoutingModule } from './display-users-routing.module';
import {UsersComponent} from './users/users.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

@NgModule({
  declarations: [UsersComponent, UserDetailComponent],
  imports: [
    CommonModule,
    DisplayUsersRoutingModule,
    NgxSpinnerModule,
  ]
})
export class DisplayUsersModule { }
