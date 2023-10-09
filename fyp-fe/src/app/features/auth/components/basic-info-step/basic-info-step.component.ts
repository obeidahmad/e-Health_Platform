import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthService} from "../../../../domain/authentication/services/auth.service";

@Component({
  selector: 'app-basic-info-step',
  templateUrl: './basic-info-step.component.html',
  styleUrls: ['./basic-info-step.component.css']
})
export class BasicInfoStepComponent implements OnInit {

  public form!: FormGroup;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _nzMessage: NzMessageService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      "email": [, [Validators.email, Validators.required]],
      "password": [, [Validators.required]],
      "first_name": [, [Validators.required]],
      "last_name": [, [Validators.required]],
    })
  }



  public isValid() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }

    return this.form.valid;
  }

  public signUpWithGoogle() {
    this._authService.authWithGoogle().then();
  }


}
