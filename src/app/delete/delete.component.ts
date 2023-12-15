import { Component } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule
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
    private _userService:UserService
  ) {
    this.loaded = true;
  }
}
