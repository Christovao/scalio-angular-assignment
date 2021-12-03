import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  getUser(value: string): Observable<Object> {
    const url = 'https://api.github.com/search/users?q=' + value;

    return this.http.get(url);
  }
}
