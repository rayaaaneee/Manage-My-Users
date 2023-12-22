import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  readonly cookieName: string = 'isLoggedIn';

  constructor(private _cookieService: CookieService) {}

  isLoggedIn(): boolean {
    return (/true/).test(this._cookieService.get(this.cookieName));
  }

  login(): void {
    this._cookieService.set(this.cookieName, 'true');
  }

  logout(): void {
    this._cookieService.set(this.cookieName, 'false');
  }
}
