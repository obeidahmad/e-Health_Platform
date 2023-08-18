import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from "../../features/auth/pages/signin/signin.component";
import {AuthRoutes} from "./auth-routes";
import {SignupComponent} from "../../features/auth/pages/signup/signup.component";
import {AuthComponent} from "../../features/auth/auth.component";
import {ForgotPasswordComponent} from "../../features/auth/pages/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "../../features/auth/pages/verify-email/verify-email.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: AuthRoutes.LOGIN,
        pathMatch: 'full',
      },
      {
        path: AuthRoutes.LOGIN,
        component: SigninComponent
      },
      {
        path: AuthRoutes.SIGNUP,
        component: SignupComponent
      },
      {
        path: AuthRoutes.FORGOT_PASSWORD,
        component: ForgotPasswordComponent
      },
      {
        path: AuthRoutes.VERIFY_EMAIL,
        component: VerifyEmailComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
