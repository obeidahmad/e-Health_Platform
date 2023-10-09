import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContainerStatus} from "../models/containers";

@Injectable({
  providedIn: 'root'
})
export class ModuleControlService {
  baseUrl = environment.module_control;

  constructor(private _httpClient: HttpClient) {
  }

  public getAllStatus(): Observable<ContainerStatus[]> {
    return this._httpClient.get<ContainerStatus[]>(this.baseUrl + '/status');
  }

  public stopContainer(containerName: string) {
    return this._httpClient.get(this.baseUrl + "/stop/" + containerName);
  }

  public startContainer(containerName: string) {
    return this._httpClient.get(this.baseUrl + "/start/" + containerName);
  }

}
