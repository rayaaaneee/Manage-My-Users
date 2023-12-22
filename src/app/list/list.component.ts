import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule, MatSort } from '@angular/material/sort';

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
    RouterModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})

export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'occupation', 'actions'];
  dataSource = new MatTableDataSource<User, MatPaginator>([]);

  search: string = '';

  loaded: boolean = false;

  event = new KeyboardEvent('keyup', { key: '' });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _userService:UserService,
    private _titleService:Title
  ) {
    this._titleService.setTitle(`User list - Manage My Users`);
  }

  ngOnInit(): void {
    this._userService.loadAll();

    this._userService.user$.next(null);

    this._userService.users$.subscribe((users: User[]) => {
      if (users.length > 0) {
        this.loaded = true;
        this.dataSource.data = users;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search = filterValue.toLowerCase();
    this.dataSource.filter = this.search;
  }

  resetFilter(input: HTMLInputElement) {
    const event = new KeyboardEvent('keyup', { key: '' });
    input.value = '';
    input.dispatchEvent(event);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'name':
          return item.name.toLowerCase();
        case 'email':
          return item.email.toLowerCase();
        case 'occupation':
          return item.occupation.toLowerCase();
        default:
          return item[property];
      }
    };
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  private customFilterPredicate() {
    return (data: User, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        data.name.toLowerCase().includes(lowerCaseFilter) ||
        data.email.toLowerCase().includes(lowerCaseFilter) ||
        data.occupation.toLowerCase().includes(lowerCaseFilter)
      );
    };
  }
}
