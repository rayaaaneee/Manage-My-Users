import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CookieService } from 'ngx-cookie-service';

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
export class AppComponent implements OnInit {

  title: string = 'angular_tp';

  isLoginPage: boolean = false;

  constructor(
    private _cookieService: CookieService,
    private _router: Router
  ) {}

  ngOnInit(): void {
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
    this._cookieService.deleteAll();
  }
}
