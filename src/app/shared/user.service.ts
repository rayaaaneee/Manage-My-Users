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
  deletedUser$ = new BehaviorSubject<User | null>(null);

  constructor(private _httpService: HttpService) {
  }

  public loadAll(): void {
    this._httpService.getAll().subscribe(
      (users: any) => {
        users = users.map((user: any) => new User(user.id, user.name, user.email, user.occupation));
        this.users$.next(users);
      }
    );
  }

  public load(id: number): void {
    this._httpService.get(id).subscribe((user: any) => {
      this.user$.next(new User(user.id, user.name, user.email, user.occupation).setOptionalInformations(user.adress, user.city, user.bio, user.phone, user.gender));
    })
  }

  public delete(user: User, subscription?: (data: any) => void): void {
    this._httpService.delete(user).subscribe((data: any) => {
      this.deletedUser$.next(user);
      if (subscription) {
        subscription(data);
      }
    });
  }

  public post(user: User, subscription?: (data: any) => void, errcallback?: (err: any) => void): void {
    this._httpService.post(user).subscribe((data: any) => {
      if (subscription) {
        subscription(data);
      }
    },
    (err) => errcallback && errcallback(err));
  }

  public update(user: User, subscription?: (data: any) => void, errcallback?: (err: any) => void): void {
    this._httpService.put(user).subscribe(
    (data: any) => {
      subscription && subscription(data);
    },
    (err) => errcallback && errcallback(err));
  }
}
