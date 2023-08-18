import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../domain/authentication/services/auth.service";
import {IsLoggedInGuard} from "./is-logged-in.guard";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  constructor(private _router: Router,
              private _authService: AuthService,
              private _authGuard: IsLoggedInGuard,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = route.data['role'] as string;
    const current_role = this._authService.getCurrentUser()?.role;
    console.log(this._authGuard.canActivate(route, state) && !!current_role && (current_role == role))
    return this._authGuard.canActivate(route, state) && !!current_role && (current_role == role)
  }

}
