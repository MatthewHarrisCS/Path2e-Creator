import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  user: User = {email: "", username: ""};
  private urlBase: string = "http://localhost:4201/auth";

  setUser(login: any): boolean {
    this.user.email = login.email;
    console.log(this.user.email);
    
    return true;
  }

  getCurrentUser(): Observable<User> {
    return of(this.user); // TEMPORARY
  //return this.http.get<Observable<User>(this.urlBase);
  }
}