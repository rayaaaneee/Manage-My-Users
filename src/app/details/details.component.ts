import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    RouterModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, AfterViewInit {

  id: number;

  loaded: boolean = false;

  user?: User;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _userService:UserService
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
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
