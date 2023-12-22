import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import accounts from './login.data.json';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/auth.service';

interface Account {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginPassword: string = '';
  loginUsername: string = '';

  registerPassword: string = '';
  registerUsername: string = '';

  hideRegisterPwd: boolean = true;
  hideLoginPwd: boolean = true;

  accountList: Account[] = accounts;

  rememberMe: boolean = false;

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _authService: AuthenticationService,
    private _titleService:Title
  ) {
    this._titleService.setTitle(`Authentication - Manage My Users`);
  }

  login(e: Event): void {

    if (this.loginUsername === '' || this.loginPassword === '') {
      this._snackBar.open('Username or password cannot be empty', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      this.loginUsername = '';
      this.loginPassword = '';
      return;
    }

    const account: Account | undefined = this.accountList.find((account: Account) => {
      return account.username === this.loginUsername && account.password === this.loginPassword;
    });

    if (account) {
      this._authService.login();
      this._router.navigate(['users']);
    } else {
      this._snackBar.open('Wrong username or password', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    }
    this.loginUsername = '';
    this.loginPassword = '';
  }

  register(e: Event): void {

    if (this.registerUsername === '' || this.registerPassword === '') {
      this._snackBar.open('Username or password cannot be empty', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      this.registerUsername = '';
      this.registerPassword = '';
      return;
    }

    const account: Account | undefined = this.accountList.find((account: Account) => {
      return account.username === this.registerUsername;
    });

    if (account) {
      this._snackBar.open('Username already exists', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
    } else {
      this.accountList.push({
        username: this.registerUsername,
        password: this.registerPassword
      });

      this._authService.login();

      this._router.navigate(['users']);
    }
    this.registerUsername = '';
    this.registerPassword = '';
  }
}
