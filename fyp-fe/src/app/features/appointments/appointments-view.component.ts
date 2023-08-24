import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../domain/authentication/services/auth.service";
import {CoreRoutes} from "../../core/core-routes";

@Component({
  selector: 'app-appointments-view',
  templateUrl: './appointments-view.component.html',
  styleUrls: ['./appointments-view.component.css']
})
export class AppointmentsViewComponent implements OnInit {

  constructor(private _router: Router,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    const currentRole = this._authService.getCurrentUserRole();
    if (currentRole == "doctor") {
      this._router.navigate([CoreRoutes.APPT, 'doctor'])
    }

  }

}
