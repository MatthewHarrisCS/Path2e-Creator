import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  tmpUser: User = {email: "test@temporary.com", username: ""};
  private urlBase: string = "http://localhost:4201/auth";

  getCurrentUser(): Observable<User> {
    return of(this.tmpUser); // TEMPORARY
  //return this.http.get<Observable<User>(this.urlBase);
  }
}