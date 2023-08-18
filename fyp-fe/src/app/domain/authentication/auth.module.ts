import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SigninComponent} from '../../features/auth/pages/signin/signin.component';
import {SignupComponent} from '../../features/auth/pages/signup/signup.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "../../features/auth/auth.component";
import {NzImageModule} from "ng-zorro-antd/image";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {SharedModule} from "../../shared/shared.module";
import { ForgotPasswordComponent } from '../../features/auth/pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../features/auth/pages/verify-email/verify-email.component';
import {NzAnchorModule} from "ng-zorro-antd/anchor";
import { PatientProfileComponent } from '../../features/auth/components/patient-profile/patient-profile.component';
import { DoctorProfileComponent } from '../../features/auth/components/doctor-profile/doctor-profile.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    AuthComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PatientProfileComponent,
    DoctorProfileComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        NzImageModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzMessageModule,
        NzDividerModule,
        SharedModule,
        NzAnchorModule,
    ]
})
export class AuthModule {
}
