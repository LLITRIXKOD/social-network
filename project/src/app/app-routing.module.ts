import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {AuthLoginGuard} from './auth-login.guard';
import {AuthIsAdminGuard} from './auth-is-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'auth', component: LogInComponent },
  { path: 'display', loadChildren: './display-users/display-users.module#DisplayUsersModule', canActivate: [AuthLoginGuard]},
  { path: 'create', loadChildren: './create-users/create-users.module#CreateUsersModule', canActivate: [AuthIsAdminGuard, AuthLoginGuard]},
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }

