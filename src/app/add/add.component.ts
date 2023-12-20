import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
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
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})

export class AddComponent {

  selectedGender: string = "not";

  loaded: boolean = true;

  user: User = new User(-1, '', '', '').setOptionalInformations('', '', '', '', 'not');

  constructor(
    private _snackBar: MatSnackBar,
    private _userService:UserService,
    private _router:Router
  ) {
  }

  handleSubmitAdding(e: Event): void {

    if (this.user.name === '' || this.user.email === '' || this.user.occupation === '') {
      this._snackBar.open('Please fill all required fields.', 'Close',
      {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
      });
      return;
    }

    this.loaded = false;
    this._userService.post(this.user,
      (user: User) => {
        console.log(user);
        this.loaded = true;
        this._snackBar.open('User ' + user.name +  ' added successfully!', 'Close',
        {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
        });
        this._router.navigate(['/']);

      },
      (error: any) => {
        console.log(error);
        this.loaded = true;
        this._snackBar.open('An error occured while adding the user.', 'Close',
        {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
        });
      }
    );
  }
}
