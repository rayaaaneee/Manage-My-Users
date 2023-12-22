import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../models/user.model';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  id: number;

  loaded: boolean = false;

  user?: User;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _userService:UserService,
    private _titleService:Title
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this._titleService.setTitle('Loading ...');
  }

  ngOnInit(): void {
    this._userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.loaded = true;
        this.user = user;
        this._titleService.setTitle(`${user.name} - Manage My Users`);
      }
    });

    if (!this.user) {
      this._userService.load(this.id);
    }
  }
}
