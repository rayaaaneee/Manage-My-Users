import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent implements OnInit {

  loaded: boolean = false;

  user?: User;

  id:number = 0;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _userService:UserService,
    private _snackBar: MatSnackBar,
    private _router:Router,
    private _titleService:Title
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this._titleService.setTitle('Loading ...');
  }

  deleteUser(): void {
    this.loaded = false;
    if (this.user) {
      this._userService.delete(this.user, (data: any) => {
        const snackBarRef = this._snackBar.open('User ' + data.name + ' succesfully deleted !', 'Undo', {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
        });
        snackBarRef.onAction().subscribe(() => {
          if (this.user) {
            this._userService.post(this.user,
              (data) => {
                this._snackBar.open('User ' + data.name + ' succesfully restored !', 'Close', {
                  duration: 3000,
                  horizontalPosition: "end",
                  verticalPosition: "top",
                });
              },
              (err) => {
                this._snackBar.open('Error while restoring user !', 'Close', {
                  duration: 3000,
                  horizontalPosition: "end",
                  verticalPosition: "top",
                });
              });
          }
        });
        this._router.navigate(['/']);
      });
    }
  }

  ngOnInit(): void {
    this._userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        this.loaded = true;
        this._titleService.setTitle(`Delete ${user.name} - Manage My Users`);
      }
    });

    if (!this.user) {
      this._userService.load(this.id);
    }
  }
}
