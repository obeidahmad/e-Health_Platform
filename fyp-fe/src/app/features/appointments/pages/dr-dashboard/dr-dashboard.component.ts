import { Component, OnInit } from '@angular/core';
import {AppointmentDto} from "../../../../domain/appointments/models/appointment-dto";
import {AppointmentService} from "../../../../domain/appointments/services/appointment.service";
import {combineChange} from "@angular/fire/compat/firestore";
import {AuthService} from "../../../../domain/authentication/services/auth.service";
import {Router} from "@angular/router";
import {CoreRoutes} from "../../../../core/core-routes";

@Component({
  selector: 'app-dr-dashboard',
  templateUrl: './dr-dashboard.component.html',
  styleUrls: ['./dr-dashboard.component.css']
})
export class DrDashboardComponent implements OnInit {
  appointments: AppointmentDto[] = [];
  loadingAppts = true;

  constructor(private _apptService: AppointmentService,
              private _router: Router,
              private _authService: AuthService) { }

  ngOnInit(): void {
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth()  , 0)
    console.log(date.toISOString().replace(/\//g, "-").split('T')[0])
    this._apptService.getAllDoctorAppointments({
      id: this._authService.getCurrentUserId(),
      timeframe: "MONTH",
      date: "2023-08-1", //date.toISOString().replace(/\//g, "-").split('T')[0]
    }).subscribe({
      complete: () =>{
        // this.loadingAppts = false;
      },
      next: (res) => {
        this.appointments = res
        console.log(res)
        this.loadingAppts = false;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  setAvailability() {
    this._router.navigate([CoreRoutes.APPT, 'doctor', 'set_availability'])
  }
}
