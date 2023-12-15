import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

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
export class DeleteComponent {

  loaded: boolean = false;

  user?: User;

  id:number = 0;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _userService:UserService,
    private _snackBar: MatSnackBar,
    private _router:Router
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
  }

  deleteUser(): void {
    this.loaded = false;
    if (this.user) {
      this._userService.delete(this.user, (data: any) => {
        const snackBarRef = this._snackBar.open('User' + data.name + 'succesfully deleted !', 'Undo', {
          duration: 3000
        });
        snackBarRef.onAction().subscribe(() => {
          if (this.user) {
            this._userService.post(this.user, (data) => {
              this._snackBar.open('User' + data.name + 'succesfully restored !', 'Close', {
                duration: 3000
              });
            },
            (err) => {
              this._snackBar.open('Error while restoring user !', 'Close', {
                duration: 3000
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
      }
    });

    this._userService.load(this.id);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 600);
  }
}
