import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class HttpService {

  #baseUrl = 'https://657afd2e394ca9e4af13490f.mockapi.io/user';

  constructor(private _httpClient: HttpClient) {
  }

  getAll() {
    return this._httpClient.get(this.#baseUrl);
  }

  get(id: number) {
    return this._httpClient.get(this.#baseUrl + '/' + id);
  }

  delete(user: User) {
    return this._httpClient.delete(this.#baseUrl + '/' + user.id);
  }

  post(user: User) {
    return this._httpClient.post(this.#baseUrl, JSON.stringify(user.toJson()));
  }

  put(user: User) {
    return this._httpClient.put(this.#baseUrl + '/' + user.id, JSON.stringify(user));
  }

}
