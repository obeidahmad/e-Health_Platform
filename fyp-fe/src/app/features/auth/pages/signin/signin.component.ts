import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form!: FormGroup;

  constructor(private _fb: FormBuilder,
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
      this._nzMessage.error(error.message, {nzPauseOnHover: true})
    });
  }

  public loginWithGoogle() {
    this._authService.authWithGoogle().then();
  }
}
