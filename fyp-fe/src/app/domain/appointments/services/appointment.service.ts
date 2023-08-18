import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../authentication/services/auth.service";
import {UserAvailabilityRequest} from "../models/user-availability-request";
import {AppointmentRequest} from "../models/appointment-request";
import {AppointmentDto} from "../models/appointment-dto";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url: string = environment.appt;

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public getAllUserAppointments(apptRequest: UserAvailabilityRequest) {
    const url: string = `${this.url}/user/${apptRequest.timeframe}/${apptRequest.date}/${apptRequest.id}`;
    return this._http.get<AppointmentDto[]>(url)
  }

  public getAllDoctorAppointments(apptRequest: UserAvailabilityRequest) {
    const url: string = `${this.url}/doctor/${apptRequest.timeframe}/${apptRequest.date}/${apptRequest.id}`;
    return this._http.get<AppointmentDto[]>(url)
  }

  public deleteAppointment(apptId: string) {
    return this._http.delete(`${this.url}/user/${apptId}`);
  }

  public setAppointment(apptRequest: AppointmentRequest) {
    const url: string = this.url + '/user';
    return this._http.post(url, apptRequest);
  }

  // public getAllDoctorAvailability(availability_request: UserAvailabilityRequest) {
  //   const url: string = `${this.url}/availability/${availability_request.timeframe}/${availability_request.date}/${availability_request.id}`
  //   return this._http.get<AvailabilityResponse[]>(this.url);
  // }
  //
  // public setDoctorAvailability(apptRequest: AppointmentRequest) {
  //   const url: string = this.url + '/user';
  //   return this._http.post(url, apptRequest);
  // }

}
