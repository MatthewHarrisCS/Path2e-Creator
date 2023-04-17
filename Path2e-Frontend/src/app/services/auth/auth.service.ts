import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private user: User = {_id: "", username: ""};
  private urlBase: string = "http://localhost:4201/auth";

  // logUser(): log the user into the website
  logUser(login: any): Observable<User> {
    return this.http.post<User>(this.urlBase + "/login", login, {withCredentials: true});
  }

  // logUser(): log the user out of the website
  logout() {
    return this.http.get(this.urlBase + "/logout", {withCredentials: true});
  }
  
  // getSession(): check if the user's session is valid
  getSession(): Observable<User> {
    return this.http.get<User>(this.urlBase + "/login", {withCredentials: true});
  }

  // register(): send a new registration to the database
  register(reg: any) {
    return this.http.post(this.urlBase + "/register", reg);
  }

  // updateEmail(): replace the user's registered email with a new one
  updateEmail(newEmail: string) {
    console.log("update");
    return this.http.post(this.urlBase + "/update/email", 
      {_id: this.user._id, email: newEmail}, 
      {withCredentials: true});
  }

  // updateUsername(): replace the user's registered username with a new one
  updateUsername(newUsername: string) {
    return this.http.post(this.urlBase + "/update/username",
      {_id: this.user._id, username: newUsername}, 
      {withCredentials: true});
  }
  
  // updatePassword(): replace the user's registered password with a new one
  updatePassword(newPassword: string) {
    return this.http.post(this.urlBase + "/update/password",
      {_id: this.user._id, password: newPassword}, 
      {withCredentials: true});
  }

  // setCurrentUser(): save the current user information to the service
  setCurrentUser(user: User) {
    this.user = user;
  }

  // getCurrentUser(): get the user information stored in the service
  getCurrentUser(): User {
    return this.user;
  }
}