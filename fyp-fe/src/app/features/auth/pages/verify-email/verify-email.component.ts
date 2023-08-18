import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder} from "@angular/forms";
import {CoreRoutes} from "../../../../core/core-routes";
import {UserInformation} from "../../../../core/models/user-auth";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  public user!: UserInformation;

  constructor(private _router: Router,
              private _auth_service: AuthService,
              private _nzMessage: NzMessageService,
              private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    const user = this._auth_service.getCurrentUser();
    if (!user) this._router.navigate([CoreRoutes.AUTH]);
    else
      this.user = user
  }

  sendMail() {
    this._auth_service.verifyEmail()
      .then(() => {
        console.log("sent")
      });
  }
}
