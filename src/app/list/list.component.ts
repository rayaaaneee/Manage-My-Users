import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../models/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'occupation', 'actions'];
  dataSource: User[] = [];

  constructor(private _userService:UserService) {
  }

  ngOnInit(): void {
    this._userService.loadData();

    this._userService.users.subscribe(
      (users: User[]) => {
        this.dataSource = users;
        console.log(this.dataSource);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
