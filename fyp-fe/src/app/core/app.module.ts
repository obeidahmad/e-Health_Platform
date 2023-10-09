import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './bootstrapped/app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing.module";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AppointmentsModule} from '../domain/appointments/appointments.module';
import {GenericDashboardComponent} from './components/generic-dashboard/generic-dashboard.component';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyNgZorroAntdModule} from '@ngx-formly/ng-zorro-antd';
import {BearerTokenInterceptor} from "./interceptors/brearer-token.interceptor";
import { ProfileComponent } from './components/profile/profile.component';
import {ErrorHandlerInterceptor} from "./interceptors/error-handler.interceptor";
import {NzMessageModule} from "ng-zorro-antd/message";
import {CustomFileInputComponent} from "../features/admin/components/custom-file-input/custom-file-input.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    GenericDashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppointmentsModule,
    FormlyModule.forRoot({
      types: [
        {name: 'dragUpload', component: CustomFileInputComponent}
      ]
    }),
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    NzMessageModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
