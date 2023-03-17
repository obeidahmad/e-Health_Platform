import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MedsQuerySettings} from "../models/meds-query-settings";
import {MedItem} from "../models/med-item";
import {Observable} from "rxjs";
import {AuthService} from "../../authentication/services/auth.service";
import {CreateMed, UpdateMed} from "../models/create-med";

@Injectable({
  providedIn: 'root'
})
export class MedsService {
  private url = environment.url + '/med';

  constructor(private _http: HttpClient,
              private _authService: AuthService) { }

  public getAll(settings: MedsQuerySettings): Observable<MedItem[]> {
    return this._http.post<MedItem[]>(this.url + '/all', settings);
  }

  public createMed(medItem: CreateMed): Observable<MedItem>{
    return this._http.post<MedItem>(this.url, medItem);
  }

  public deleteMed(medId: string){
    return this._http.delete(this.url + `/${medId}`);
  }

  public updateMed(medItem: UpdateMed) {
    return this._http.put(this.url, medItem);
  }

  public getBookmarked(): Observable<MedItem[]> {
    const userId = this._authService.getCurrentUser().uid;
    return this._http.get<MedItem[]>(this.url + `/user/bookmark/${userId}`)
  }
  public bookmarkMeds(medIds: string[]) {
    const userId = this._authService.getCurrentUser().uid;
    return this._http.post(this.url + `/user/bookmark/${userId}`, medIds)
  }

  public unBookmarkMeds(medIds: string[]) {
    const userId = this._authService.getCurrentUser().uid;
    return this._http.post(this.url + `/user/bookmark/${userId}`, medIds)
  }

  public reserveMed(medId: string) {
    const userId = this._authService.getCurrentUser().uid;
    return this._http.post(this.url + `/user/purchase/${userId}/${medId}`, {})
  }

  public unReserveMed(medId: string) {
    const userId = this._authService.getCurrentUser().uid;
    return this._http.delete(this.url + `/purchase/${medId}` )
  }



}
