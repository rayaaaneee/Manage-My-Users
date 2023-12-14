import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  users$ = new BehaviorSubject<User[]>([]);
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private _httpService: HttpService) {
  }

  public loadAll() {
    this._httpService.getAll().subscribe(
      (users: any) => {
        users = users.map((user: any) => new User(user.id, user.name, user.email, user.occupation, user.streetAdress, user.city, user.bio, user.phone, user.gender));
        this.users$.next(users);
      }
    );
  }

  public load(id: number) {
    return this._httpService.get(id).subscribe((user: any) => {
      this.user$.next(new User(user.id, user.name, user.email, user.occupation, user.streetAdress, user.city, user.bio, user.phone, user.gender));
    })
  }
}
