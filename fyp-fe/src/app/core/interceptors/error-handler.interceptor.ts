import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpError} from "../models/http-error";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {
  }

  // todo update for Sprint
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(error => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) { //client side
          errorMessage = "An error has occurred";
        } else {
          if (error.status == 0) errorMessage = "The application is disconnected"
          else if (error.status >= 500)
            errorMessage = "Unexpected fatal error."
          else {
            errorMessage = error.error?.detail || 'An error has occurred';
          }
        }
        return throwError((): HttpError => {
          return {message: errorMessage, status: error.status}
        });
      }));
  }
}
