import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CapComponent } from './cap/cap.component';
import { CellarComponent } from './cellar/cellar.component';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CapComponent,
    CellarComponent,
    UsersComponent,
    UserDetailComponent,
    NewUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
