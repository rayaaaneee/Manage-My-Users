import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _cookieService: CookieService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.isLoggedIn()) {
      if (state.url === '/login') {
        this._router.navigate(['/users']);
        return false;
      } else {
        return true;
      }
    } else {
      if (state.url !== '/login') {
        this._router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }
  }
}
