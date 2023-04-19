import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { RegExpressions } from 'src/functions/regexp';
import { User } from 'src/models/user';

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService) {}
    
  public user: User = {_id: "", username: ""};

  public modalEmail: boolean = false;
  public modalUsername: boolean = false;
  public modalPassword: boolean = false;

  public newEmail = this.fb.control("", [Validators.required, Validators.email]);
  public newUsername = this.fb.control("", [Validators.required]);
  public newPassword = this.fb.control("", [Validators.required]);

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
  }

  // updateEmail(): Send the provided new email address to
  //                the database and update the previous one
  updateEmail(newEmail: string) {
    this.auth.updateEmail(newEmail).subscribe();
    this.modalEmail = false;
  }

  // updateUsername(): Send the provided new username to the
  //                   database and update the previous one
  updateUsername(newUsername: string) {
    this.auth.updateUsername(newUsername).subscribe(x => {
      if (x) {
        // If the update was successful, log the new username
        // to the auth service
        let newUser = this.auth.getCurrentUser();
        newUser.username = newUsername;
        this.auth.setCurrentUser(newUser);
      }
    });
    this.modalUsername = false;
  }

  // updatePassword(): Send the provided new password to the
  //                   database and update the previous one
  updatePassword(newPassword: string) {
    this.auth.updatePassword(newPassword).subscribe();
    this.modalPassword = false;
  }

  // emailCheck(): Return true if the provided email is valid
  emailCheck(email: string) {
    return RegExpressions.email(email);
  }

  // usernameCheck(): Return true if the provided username is valid
  usernameCheck(username: string) {
    return RegExpressions.username(username);
  }

  // passwordCheck(): Return true if the provided passwords match and
  //                  pass the length requirement
  passwordCheck(p1: string, p2: string) {
    return p1 == p2 && p1.length >= 8;
  }

  modalFalse() {
    this.modalEmail = false;
    this.modalUsername = false;
    this.modalPassword = false;
  }
}
