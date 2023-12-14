import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  users = new BehaviorSubject<User[]>([]);

  constructor(private _httpService: HttpService) {
  }

  public loadData() {
    this._httpService.get().subscribe((users: any) => {
      users = users.map((user: any) => new User(user.id, user.name, user.email, user.occupation));
      this.users.next(users);
    });
  }
}
