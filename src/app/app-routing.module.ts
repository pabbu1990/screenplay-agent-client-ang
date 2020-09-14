import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CampgroundsComponent} from './campgrounds/campgrounds.component'
import {NewComponent} from "./new/new.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {BaseComponent} from "./base/base.component";


const appRoutes: Routes = [
  { path: '', component: BaseComponent},
  { path: 'campgrounds', component: CampgroundsComponent},
  { path: 'new', component: NewComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
