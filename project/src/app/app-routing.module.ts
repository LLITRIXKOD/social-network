import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {AuthLoginGuard} from './auth-login.guard';
import {AuthIsAdminGuard} from './auth-is-admin.guard';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},  /*FIXME: redirectTo: '/auth'*/
  { path: 'auth', component: LogInComponent },
  { path: 'display', loadChildren: './display-users/display-users.module#DisplayUsersModule', canActivate: [AuthLoginGuard]},
  { path: 'create', loadChildren: './create-users/create-users.module#CreateUsersModule', canActivate: [AuthIsAdminGuard]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }

