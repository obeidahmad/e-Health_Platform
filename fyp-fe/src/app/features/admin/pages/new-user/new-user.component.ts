import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {Router} from "@angular/router";
import {CoreRoutes} from "../../../../core/core-routes";
import {AuthRoutes} from "../../../../domain/authentication/auth-routes";
import {AdminRoutes} from "../../../../domain/admin/admin-routes";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  constructor(private _auth: AuthService, private _router: Router) { }

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'first_name',
          props: {
            required: true,
            label: 'First Name',
          },
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'last_name',
          props: {
            required: true,
            label: 'Last Name',
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'email',
          props: {
            type: 'email',
            required: true,
            label: 'Email',
          },
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'password',
          props: {
            type: 'password',
            required: true,
            label: 'Password',
          },
        },
      ],
    },
    {
      key: 'role',
      type: 'select',
      defaultValue: 'nurse',
      props: {
        label: 'Select Role',
        placeholder: 'Doctor',
        required: true,
        options: [
          { value: "doctor", label: "Doctor" },
          { value: "nurse", label: "Nurse" }
        ],
      },
    },
    {
      key: 'time_slot',
      type: 'input',
      defaultValue: 15,
      props: {
        required: true,
        type: "number",
        label: 'Time Slot',
      },
      expressions: {
        hide: "model.role == 'nurse'",
      },
    },
  ]

  ngOnInit(): void {
  }

  submit() {
    const body = {
      ...this.model,
      admin_token: this._auth.getToken()
    }
    if (this.model.role == 'nurse')
      this._auth.addNurse(body).subscribe({
        next: () => this._router.navigate([CoreRoutes.ADMIN, AdminRoutes.USERS]).then()
      })
    else {
      this._auth.addDoctor(body).subscribe({
        next: () => this._router.navigate([CoreRoutes.ADMIN, AdminRoutes.USERS]).then()
      })
    }
  }
}
