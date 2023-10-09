import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthService} from "../../../../domain/authentication/services/auth.service";

@Component({
  selector: 'app-profile-info-step',
  templateUrl: './profile-info-step.component.html',
  styleUrls: ['./profile-info-step.component.css']
})
export class ProfileInfoStepComponent implements OnInit {
  public form!: FormGroup;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _nzMessage: NzMessageService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      "date_of_birth": [, [Validators.required]],
      "place_of_birth": [, [Validators.required]],
      "gender": [, [Validators.required]],
      "address": [, [Validators.required]],
      "civil_status": [, [Validators.required]],
      "phone_number": [, [Validators.required]],
      "nationality": [, [Validators.required]],
      // "phoneNumberPrefix": ['+961']
    })
  }

  public isValid() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }

    return !this.form.valid;

  }

}
