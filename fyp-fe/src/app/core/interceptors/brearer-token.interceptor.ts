import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {CoreRoutes} from "../core-routes";

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {

  constructor(private _router: Router,
              private _nzMessageService: NzMessageService) {
  }

  updateHttpTokenHeader(request: any) {
    const token = localStorage.getItem("token") || "";

    if (token && request.headers.authorization !== token) {
      return request.clone({
        headers: request.headers
          .set('authorization', `Bearer ${token}`)
      });
    } else {
      return request;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.updateHttpTokenHeader(request);
    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status && error.status === 401) {
          this._nzMessageService.warning("Session timed out, login again.");
          this._router.navigate([CoreRoutes.AUTH]).then();
        }
        return throwError(error);
      }))
  }
}
