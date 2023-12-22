import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title } from "@angular/platform-browser";

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})

export class UpdateComponent implements OnInit {

  id: number;

  loaded: boolean = false;

  user?: User;
  initialUserName: string = '';

  constructor(
    private _snackBar: MatSnackBar,
    private _activatedRoute:ActivatedRoute,
    private _userService:UserService,
    private _router:Router,
    private _titleService:Title
  ) {
    this._titleService.setTitle('Loading ...');
    this.id = this._activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        this.loaded = true;
        this._titleService.setTitle(`Edit ${user.name} - Manage My Users`);
        this.initialUserName = user.name;
      }
    });
    this._userService.load(this.id);
  }

  handleSubmitEdition(e: Event): void {

    if (this.user?.name === '' || this.user?.email === '' || this.user?.occupation === '') {
      this._snackBar.open('Please fill all required fields.', 'Close',
      {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
      });
      return;
    }

    this.loaded = false;
    if (this.user) {
      this._userService.update(this.user,
        (data) => {
          this._snackBar.open('User ' + this.initialUserName + ' succesfully updated !', 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top",
          });
          this.loaded = true;
          this._router.navigate(['/user', this.user?.id ]);
        },
        (err) => {
          this._snackBar.open('An error occured while updating ' + this.initialUserName, 'Close', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top",
          });
          this.loaded = true;
          this._router.navigate(['/user', this.user?.id ]);
        }
      );
    }
  }
}
