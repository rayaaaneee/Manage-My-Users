import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';

import { User } from '../models/user.model';

import { UserService } from '../shared/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'occupation', 'actions'];
  dataSource = new MatTableDataSource<User, MatPaginator>([]);
  search: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _userService:UserService) {
  }

  ngOnInit(): void {

    this._userService.users$.subscribe((users: User[]) => {
      this.dataSource.data = users;
    });

    this._userService.loadAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
