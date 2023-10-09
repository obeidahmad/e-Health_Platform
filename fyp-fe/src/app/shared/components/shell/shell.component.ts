import {Component, OnInit} from '@angular/core';
import {CoreRoutes} from "../../../core/core-routes";
import {AuthService} from "../../../domain/authentication/services/auth.service";
import {Router} from "@angular/router";
import {AdminRoutes} from "../../../domain/admin/admin-routes";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  selected: any = [];
  adminRoutes = [
    {
      name: "Medicines",
      route: ['/', CoreRoutes.MEDS],
      selected: true,
    },
    {
      name: "Users",
      selected: false,
      route: ['/', CoreRoutes.ADMIN, AdminRoutes.USERS],

    },
    {
      name: "Advanced",
      selected: false,
      route: ['/', CoreRoutes.ADMIN, AdminRoutes.MODULE_CONTROL]
    },
    {
      name: "Events",
      selected: false,
      route: ['/', CoreRoutes.ADMIN, AdminRoutes.EVENTS]
    }

  ]
  patientRoutes = [
    {
      name: "Medicines",
      route: ['/', CoreRoutes.MEDS],
      selected: true,
    },
    {
      name: "Appointments",
      selected: false,
      route: ['/', CoreRoutes.APPT, 'patient'],

    }
  ]
  doctorRoutes = [
    {
      name: "Appointments",
      route: ['/', CoreRoutes.APPT, 'doctor'],
      selected: true,

    },
    {
      name: "Patients",
      selected: false,
      route: ['/', CoreRoutes.ADMIN, AdminRoutes.USERS],
    }
  ]
  nurseRoutes = [
    // {
    //   name: "Appointments",
    //   route: ['/', CoreRoutes.APPT],
    //   selected: true,
    //
    // },
    {
      name: "Medicines",
      route: ['/', CoreRoutes.MEDS],
      selected: false,

    },
    {
      name: "Users",
      selected: false,
      route: ['/', CoreRoutes.ADMIN, AdminRoutes.USERS],

    },
  ]

  constructor(private _authService: AuthService,
              private _router: Router) {

  }

  ngOnInit(): void {
    const role = this._authService.getCurrentUserRole();
    switch (role) {
      case 'doctor':
        this.selected = this.doctorRoutes;
        break;
      case 'patient':
        this.selected = this.patientRoutes;
        break;
      case 'nurse':
        this.selected = this.nurseRoutes;
        break;
      case 'admin':
        this.selected = this.adminRoutes;
        break;
      default:
        this.selected = this.adminRoutes;
      // this._router.navigate([CoreRoutes.AUTH]);
    }

  }

  gotoProfile() {

  }

  getName() {
    return this._authService.getCurrentUser()?.name;
  }

  logout() {
    this._authService.logout()
  }
}
