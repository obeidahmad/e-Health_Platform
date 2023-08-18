import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {CoreRoutes} from "../../../../core/core-routes";
import {AuthRoutes} from "../../../../domain/authentication/auth-routes";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public form!: FormGroup;
  private readonly email!: string;

  constructor(private _router: Router,
              private _auth_service: AuthService,
              private _nzMessage: NzMessageService,
              private _fb: FormBuilder) {
    const state = _router.getCurrentNavigation()?.extras?.state;
    this.email = state?.['email'];
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      "email": [this.email, [Validators.email, Validators.required]],
    })
  }

  submitForm() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }

    if (!this.form.valid) return;

    this._auth_service.forgotPassword(this.form.value.email).then(res => {
      this._nzMessage.success(res, {nzPauseOnHover: true, nzDuration: 3000, nzAnimate: true});
      this._router.navigate([CoreRoutes.AUTH, AuthRoutes.LOGIN])
    }).catch(error=>{
      this._nzMessage.error(error.message, {nzPauseOnHover: true, nzDuration: 2500, nzAnimate: true})
    })
  }
}
