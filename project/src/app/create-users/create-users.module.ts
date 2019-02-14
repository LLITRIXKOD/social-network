import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CalendarModule} from 'primeng/calendar';


import { CreateUsersRoutingModule } from './create-users-routing.module';
import {NewUserComponent} from './new-user/new-user.component';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../app.module';

@NgModule({
  declarations: [NewUserComponent],
  imports: [
    CommonModule,
    CreateUsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CalendarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class CreateUsersModule { }
