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

  post(data: User) {
    return this._httpClient.post(this.#baseUrl + '/' + data.id, data.toJson());
  }

  put(data: User) {
    return this._httpClient.put(this.#baseUrl + '/' + data.id, JSON.stringify(data));
  }

  delete(data: User) {
    return this._httpClient.delete(this.#baseUrl + '/' + data.id);
  }
}
