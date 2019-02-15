import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewUserComponent} from './new-user/new-user.component';
import {UnsavedChangesGuard} from '../unsaved-changes.guard';

const routes: Routes = [
  { path: '', redirectTo: './add', pathMatch: 'full'},
  { path: 'add', component: NewUserComponent },
  { path: 'update/:id', component: NewUserComponent, canDeactivate: [UnsavedChangesGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUsersRoutingModule { }
