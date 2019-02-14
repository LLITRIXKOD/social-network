import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewUserComponent} from './new-user/new-user.component';

const routes: Routes = [
  { path: '', redirectTo: './add', pathMatch: 'full'},
  { path: 'add', component: NewUserComponent },
  { path: 'update/:id', component: NewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUsersRoutingModule { }
