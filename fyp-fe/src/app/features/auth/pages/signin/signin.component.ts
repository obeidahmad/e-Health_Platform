import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {CoreRoutes} from "../../../../core/core-routes";
import {AuthRoutes} from "../../../../domain/authentication/auth-routes";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form!: FormGroup;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _nzMessage: NzMessageService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      "email": [, [Validators.email, Validators.required]],
      "password": [, [Validators.required]]
    })
  }

  public submitForm() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }

    if (!this.form.valid) return;

    this._authService.signIn(this.form.value).catch(error => {
      this._nzMessage.error(error.message, {nzPauseOnHover: true, nzDuration: 2500, nzAnimate: true})
    });
  }

  public loginWithGoogle() {
    this._authService.authWithGoogle().then();
  }

  onForgotPassword() {
    const email: string = this.form.value.email;
    if (email) {
      this._router.navigate([CoreRoutes.AUTH, AuthRoutes.FORGOT_PASSWORD], {state: {email}}).then()
    } else {
      this._router.navigate([CoreRoutes.AUTH, AuthRoutes.FORGOT_PASSWORD]).then()
    }
  }
}
