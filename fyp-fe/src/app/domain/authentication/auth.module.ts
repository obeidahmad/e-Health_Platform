import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SigninComponent} from '../../features/auth/pages/signin/signin.component';
import {SignupComponent} from '../../features/auth/pages/signup/signup.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "../../features/auth/auth.component";


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
