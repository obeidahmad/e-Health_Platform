import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MedsQuerySettings} from "../models/meds-query-settings";
import {MedItem} from "../models/med-item";
import {Observable} from "rxjs";
import {AuthService} from "../../authentication/services/auth.service";
import {CreateMed, UpdateMed} from "../models/create-med";
import {user} from "@angular/fire/auth";
import {Purchase} from "../models/purchase";

@Injectable({
  providedIn: 'root'
})
export class MedsService {
  private url = environment.meds;

  constructor(private _http: HttpClient,
              private _authService: AuthService) {
  }

  public getAll(settings: MedsQuerySettings): Observable<MedItem[]> {
    return this._http.post<MedItem[]>(this.url + '/all', settings);
  }

  public getAllByUser(settings: MedsQuerySettings): Observable<MedItem[]> {
    const userId = this._authService.getCurrentUserId();
    return this._http.post<MedItem[]>(`${this.url}/all/${userId}`, settings);
  }

  public createMed(medItem: CreateMed): Observable<MedItem> {
    return this._http.post<MedItem>(this.url, medItem);
  }

  public getMedById(medId: string): Observable<MedItem> {
    return this._http.get<MedItem>(`${this.url}/${medId}`);
  }

  public deleteMed(medId: string) {
    return this._http.delete(this.url + `/${medId}`);
  }

  public updateMed(medItem: UpdateMed) {
    return this._http.put(this.url, medItem);
  }

  public getBookmarked(): Observable<MedItem[]> {
    const userId = this._authService.getCurrentUserId();
    return this._http.get<MedItem[]>(this.url + `/user/bookmark/${userId}`)
  }

  public bookmarkMeds(medIds: string[]) {
    const userId = this._authService.getCurrentUserId();
    return this._http.post(this.url + `/user/bookmark/${userId}`, medIds)
  }

  public unBookmarkMeds(medIds: string[]) {
    const userId = this._authService.getCurrentUserId();
    return this._http.post(this.url + `/user/bookmark/delete/${userId}`, medIds)
  }

  public reserveMed(medId: string) {
    const userId = this._authService.getCurrentUserId();
    return this._http.post(this.url + `/user/purchase/${userId}/${medId}`, {})
  }

  public getUserPurchases(): Observable<Purchase[]>{
    const userId = this._authService.getCurrentUserId();
    return this._http.get<Purchase[]>(this.url + `/user/purchase/${userId}`);
  }

  public unReserveMed(purchaseId: string) {
    const userId = this._authService.getCurrentUserId();
    return this._http.delete(this.url + `/purchase/delete/${purchaseId}`)
  }

  public getMedForms(): Observable<string[]> {
    return this._http.get<string[]>(this.url + '/forms');
  }

  public getMedClasses(): Observable<string[]> {
    return this._http.get<string[]>(this.url + '/classes');
  }

}
