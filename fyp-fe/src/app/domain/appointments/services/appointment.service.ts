import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../authentication/services/auth.service";
import {UserAvailabilityRequest} from "../models/user-availability-request";
import {AvailabilityResponse} from "../models/availability-response";
import {AppointmentRequest} from "../models/appointment-request";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url: string = environment.appt;

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public getUserAppt(apptRequest: UserAvailabilityRequest) {
    const url: string = `${this.url}/user/${apptRequest.timeframe}/${apptRequest.date}/${apptRequest.id}`;
    return this._http.get<AvailabilityResponse>(url)
  }

  public getDrAppt(apptRequest: UserAvailabilityRequest) {
    const url: string = `${this.url}/doctor/${apptRequest.timeframe}/${apptRequest.date}/${apptRequest.id}`;
    return this._http.get<AvailabilityResponse>(url)
  }

  public deleteUserAppt(apptId: string) {
    return this._http.delete(`${this.url}/${apptId}`);

  }

  public makeUserAppt(apptRequest: AppointmentRequest) {
    const url: string = this.url + '/user';
    return this._http.post(url, apptRequest);
  }
}
