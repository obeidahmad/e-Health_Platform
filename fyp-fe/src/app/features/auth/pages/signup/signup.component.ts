import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {BasicInfoStepComponent} from "../../components/basic-info-step/basic-info-step.component";
import {ProfileInfoStepComponent} from "../../components/profile-info-step/profile-info-step.component";
import {CoreRoutes} from "../../../../core/core-routes";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form!: FormGroup;
  currentStep: number = 0;
  @ViewChild(BasicInfoStepComponent) basicComponent!: BasicInfoStepComponent;
  @ViewChild(ProfileInfoStepComponent) profileComponent!: ProfileInfoStepComponent;


  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _nzMessage: NzMessageService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {

  }

  pre(): void {
    this.currentStep -= 1;
  }

  next(): void {
    const valid = this.basicComponent.isValid();
    console.log(valid)
    if (valid) {
      this.currentStep += 1;
    }

  }

  done(): void {
    console.log('done');
    const full = {
      ...this.basicComponent.form.value,
      base_user_info: {
        ...this.profileComponent.form.value,
        date_of_birth: (new Date(this.profileComponent.form.value.date_of_birth).toISOString()).slice(0, 10),
        address: '',

      },
    }
    console.log(full)
    this._authService.signUp(full);
  }

  redirectToSignIn() {
    this._router.navigate([CoreRoutes.AUTH])
  }
}
