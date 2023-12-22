import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthenticationService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isLoginPage: boolean = false;

  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) {
    this.updateIsLoginPage();

    // Souscrire à l'événement de navigation pour détecter les changements d'URL
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateIsLoginPage();
      }
    });
  }

  updateIsLoginPage(): void {
    this.isLoginPage = window.location.pathname === '/login';
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
