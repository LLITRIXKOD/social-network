import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CapComponent } from './cap/cap.component';
import { CellarComponent } from './cellar/cellar.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import { LogInComponent } from './log-in/log-in.component';
import {AuthLoginGuard} from './auth-login.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    CapComponent,
    CellarComponent,
    LogInComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule
  ],
  exports: [
    AppComponent,
    CapComponent,
    CellarComponent,
  ],
  providers: [AuthLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
