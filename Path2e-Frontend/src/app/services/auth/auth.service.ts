import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private user: User = {email: "", username: ""};
  private urlBase: string = "http://localhost:4201/auth";

  logUser(login: any): Observable<User> {
    // find the entry and return true if successfully logged in
    return this.http.post<User>(this.urlBase + "/login", login);
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

  getCurrentUser(): Observable<User> {
    return of(this.user);
  }
}