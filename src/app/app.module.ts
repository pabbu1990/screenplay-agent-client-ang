import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ServerService } from './campgrounds/server.service';
import { CampgroundsComponent } from './campgrounds/campgrounds.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { NewComponent } from './new/new.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { provideRoutes} from '@angular/router';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    CampgroundsComponent,
    NewComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [ServerService, CampgroundsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
