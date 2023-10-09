import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpError} from "../models/http-error";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {CoreRoutes} from "../core-routes";
import {AuthRoutes} from "../../domain/authentication/auth-routes";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private _router: Router,
              private _nzMessage: NzMessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(error => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) { //client side
          errorMessage = "An error has occurred";
        } else if (error.status == 0) errorMessage = "The application is disconnected"
        else if (error.status >= 500)
          errorMessage = "Unexpected fatal error."
        else if (error.status == 401 || error.status == 403) {
          this._router.navigate([CoreRoutes.AUTH, AuthRoutes.LOGIN]).then(() => this._nzMessage.warning("Session expired"))
        } else {
          errorMessage = error.error?.detail || 'An error has occurred';
        }

        return throwError((): HttpError => {
          return {message: errorMessage, status: error.status}
        });
      }));
  }
}
