import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../authentication/services/auth.service";
import {UserAvailabilityRequest} from "../models/user-availability-request";
import {Observable} from "rxjs";
import {AvailabilityResponse} from "../models/availability-response";
import {AvailabilityRequest} from "../models/availability-request";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private url: string = environment.appt;

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public getDrAvailability(availability: UserAvailabilityRequest): Observable<AvailabilityResponse[]> {
    const url: string = `${this.url}/availability/${availability.timeframe}/${availability.date}/${availability.id}`;
    return this._http.get<AvailabilityResponse[]>(url);
  }

  public setDrAvailability(availability: AvailabilityRequest) {
    return this._http.post<AvailabilityResponse[]>(this.url + '/availability', availability);
  }
}
